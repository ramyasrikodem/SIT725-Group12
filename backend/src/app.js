const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const connectDB = require('../../core/config/db');

// Import route files
const indexRoutes = require('../routes/index');
const authRoutes = require('../routes/auth');
const mediaRoutes = require('../routes/media');
const adminRoutes = require('../routes/admin');

const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Security middleware with CSP configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://images.pexels.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware (for storing tokens)
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// Add CORS middleware to allow all origins (for testing)
app.use(cors());

// Use routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/media', mediaRoutes);
app.use('/admin', adminRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { error: err });
});

// Start server
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
