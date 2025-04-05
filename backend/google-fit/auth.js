const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.body.write'
];

module.exports = {
  getAuthUrl: () => oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
  }),
  getTokens: async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  },
  oauth2Client
};
