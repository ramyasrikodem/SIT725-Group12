const express = require('express');
const router = express.Router();

// Home page redirect (if not logged in, redirect to login)
router.get('/', (req, res) => {
  if (req.session.token) {
    return res.redirect('/media/upload');
  }
  res.render('login', { error: null });
});

module.exports = router;
