const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Show login page
router.get('/login', (req, res) => res.render('login', { error: null }));

// Process login
router.post('/login', authController.login);

// Show the registration page
router.get('/register', (req, res) => res.render('register', { error: null }));

// Process registration
router.post('/register', authController.register);

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
