const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
const ALLOWED_DOC_TYPES = ['application/pdf'];

// Simulated deepfake detection function
const analyzeMedia = (file) => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      if (file.mimetype === 'application/pdf') {
        // Special handling for PDF files
        const result = {
          result: Math.random() > 0.5 ? 'FAKE' : 'REAL',
          confidence: Math.floor(Math.random() * 30) + 70,
          details: {
            timestamp: new Date().toISOString(),
            filename: file.originalname,
            filesize: file.size,
            mediaType: file.mimetype,
            pageCount: Math.floor(Math.random() * 10) + 1,
            documentType: 'PDF Document'
          }
        };
        resolve(result);
      } else {
        // Random result for demonstration (images and videos)
        const isFake = Math.random() > 0.5;
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-99% confidence
        resolve({
          result: isFake ? 'FAKE' : 'REAL',
          confidence: confidence,
          details: {
            timestamp: new Date().toISOString(),
            filename: file.originalname,
            filesize: file.size,
            mediaType: file.mimetype
          }
        });
      }
    }, 1500);
  });
};

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.render('upload', { 
        uploadResult: null, 
        error: 'Please select a file to upload' 
      });
    }

    // Check if file type is allowed
    const fileType = req.file.mimetype;
    if (![...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_DOC_TYPES].includes(fileType)) {
      return res.render('upload', {
        uploadResult: null,
        error: 'Invalid file type. Please upload an image, video, or PDF file.'
      });
    }

    const result = await analyzeMedia(req.file);
    fs.unlink(req.file.path, err => { if(err) console.error('Error deleting file:', err); });

    return res.render('upload', { uploadResult: result, error: null });
  } catch (error) {
    console.error('Upload error:', error);
    return res.render('upload', { 
      uploadResult: null, 
      error: 'Analysis failed. Please try again.' 
    });
  }
};

exports.listReports = async (req, res) => {
  try {
    const scans = [1, 2, 3];
    res.render('reports', { scans });
  } catch (error) {
    console.error('Reports error:', error);
    res.render('error', { error: 'Failed to retrieve reports' });
  }
};
