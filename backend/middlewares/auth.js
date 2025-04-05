const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate requests
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid authentication' });
    }

    // Attach user info to request object
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ error: 'Unauthorized access' });
  }
};

module.exports = auth;
