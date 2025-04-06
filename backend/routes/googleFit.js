const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const User = require('../models/User');
const GoogleFitToken = require('../models/GoogleFitToken');
const Weight = require('../models/Weight');
const auth = require('../middlewares/auth');

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Simplified scopes for weight data only
const SCOPES = [
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write'
];

// Generate Google Fit auth URL

router.get('/connect', auth, (req, res) => {
  try {
    console.log("request got")
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      state: req.user.id.toString(),
      prompt: 'consent'
    });
    console.log("working")
    console.log(`Auth URL generated for user: ${req.user.id}`);
    res.json({ url });
  } catch (error) {
    console.error('[Google Fit] Auth Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate auth URL',
      code: 'AUTH_FAILED'
    });
  }
});

// Handle OAuth callback
router.get('/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
 console.log("callbakc")
    if (!code || !state) {
      console.error('Missing OAuth parameters');
      return res.redirect(`${process.env.FRONTEND_URL}/athlete?error=invalid_params`);
    }

    const { tokens } = await oauth2Client.getToken(code);
    console.log(`Tokens received for user: ${state}`);
    console.log("callbakc")
    console.log("callbakc")
    // Update user connection status
    await User.findByIdAndUpdate(state, { fitConnected: true }, { new: true });
    
    // Store tokens
    await GoogleFitToken.findOneAndUpdate(
      { userId: state },
      {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date || Date.now() + 3600000
      },
      { upsert: true, runValidators: true }
    );

    console.log(`Google Fit connected for user: ${state}`);
    // frontend
    res.redirect(`${process.env.FRONTEND_URL}/athlete?fit_connected=true&ts=${Date.now()}`);
    
  } catch (error) {
    console.error('[Google Fit] Connection Error:', error.message);
    res.redirect(`${process.env.FRONTEND_URL}/athlete?error=connection_failed&details=${encodeURIComponent(error.message)}`);
  }
});

// Create mock weight data
const createMockData = (userId) => [{
  userId,
  value: null,
  date: new Date(),
  source: 'mock',
  _id: new mongoose.Types.ObjectId()
}];

// Enhanced sync endpoint with mock data support
router.get('/sync-weights', auth, async (req, res) => {
  try {
    console.log("request to sync")
    const token = await GoogleFitToken.findOne({ userId: req.user.id });
    
    if (!token) {
      console.log('No Google Fit connection found, returning mock data');
      return res.json({ 
        success: true,
        data: createMockData(req.user.id),
        isMock: true
      });
    }

    oauth2Client.setCredentials({
      access_token: token.accessToken,
      refresh_token: token.refreshToken
    });

    // Token refresh logic
    console.log("request2 to sync")
    if (token.expiryDate < Date.now() + 300000) {
      try {
        const { credentials } = await oauth2Client.refreshAccessToken();
        await GoogleFitToken.findOneAndUpdate(
          { userId: req.user.id },
          {
            accessToken: credentials.access_token,
            expiryDate: credentials.expiry_date
          }
        );
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        await User.findByIdAndUpdate(req.user.id, { fitConnected: false });
        return res.json({
          success: true,
          data: createMockData(req.user.id),
          isMock: true
        });
      }
    }

    // Attempt real data 
    console.log("request3 to sync")
    try {
      const fitness = google.fitness({
        version: "v1",
        auth: oauth2Client,
      });
      const now = Date.now();
      console.log("request4 to sync")
      const response = await fitness.users.dataSources.datasets.get({
        userId: 'me',
        dataSourceId: 'derived:com.google.weight:com.google.android.gms:merge_weight',
        datasetId: `${now - 2592000000}000000-${now}000000` // 30 days
      });
      console.log("request5 to sync")
      const weights = response.data.point
        ?.filter(p => p.value?.[0]?.fpVal)
        ?.map(p => ({
          userId: req.user.id,
          value: p.value[0].fpVal,
          date: new Date(parseInt(p.startTimeNanos) / 1000000),
          source: 'google_fit'
        })) || createMockData(req.user.id);
        console.log("request6 to sync")
      console.log(`Synced ${weights.length} weight entries`);
      await Weight.insertMany(weights, { ordered: false });
      
      return res.json({
        success: true,
        data: weights,
        isMock: weights[0]?.source === 'mock'
      });

    } catch (apiError) {
      console.error('Google Fit API Error:', apiError.message);
      return res.json({
        success: true,
        data: createMockData(req.user.id),
        isMock: true
      });
    }

  } catch (error) {
    console.error('[Sync Error]', error.message);
    return res.status(500).json({
      error: 'Weight sync failed',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

module.exports = router;