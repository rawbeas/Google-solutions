const express = require('express');
const router = express.Router();
const { signUpUser, loginUser, getProfile } = require('../controllers/userController');
const auth = require('../middlewares/auth'); // Import auth middleware

// Signup route (No authentication required)
router.post('/signUp', signUpUser);

// Login route (No authentication required)
router.post('/logIn', loginUser);

// Protected route: Get user profile (Requires authentication)
router.get('/profile', auth, getProfile);

module.exports = router;

