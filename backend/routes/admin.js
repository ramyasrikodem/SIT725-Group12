const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Render admin dashboard page
router.get('/', adminController.getDashboard);

module.exports = router;
