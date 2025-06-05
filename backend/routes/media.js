const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const multer = require('multer');
const path = require('path');
const { isAuthenticated } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
  const allowedDocTypes = ['application/pdf'];
  
  if (allowedImageTypes.includes(file.mimetype) || 
      allowedVideoTypes.includes(file.mimetype) || 
      allowedDocTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, MP4, MOV, and PDF files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  }
});

// Render upload page
router.get('/upload', isAuthenticated, (req, res) => res.render('upload', { uploadResult: null, error: null }));

// Handle file upload POST
router.post('/upload', isAuthenticated, (req, res, next) => {
  upload.single('media')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.render('upload', { 
          uploadResult: null, 
          error: 'File is too large. Maximum size is 50MB.' 
        });
      }
      return res.render('upload', { 
        uploadResult: null, 
        error: 'File upload error: ' + err.message 
      });
    } else if (err) {
      return res.render('upload', { 
        uploadResult: null, 
        error: err.message 
      });
    }
    next();
  });
}, mediaController.uploadMedia);

// Report list route
router.get('/reports', mediaController.listReports);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Media route error:', err);
  res.render('upload', {
    uploadResult: null,
    error: 'An error occurred while processing your request.'
  });
});

module.exports = router;
