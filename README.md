# Deepfake Detection System
A web-based application that helps detect deepfake media using advanced detection algorithms. The system provides user authentication, media upload capabilities, and an admin dashboard for managing the detection system.

## Features
- User Authentication: Secure login and registration system
- Media Upload: Upload images and videos for deepfake detection
- Real-time Analysis: Get instant detection results with confidence scores
- Admin Dashboard: Monitor and manage the detection system
- Detailed Reports: View and analyze detection reports
- Secure Architecture: Implemented with security best practices


## Tech Stack
### Frontend
- React.js
- Bootstrap for styling
- Axios for API calls

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd deepfake-detection-system
```

2. Install dependencies:
```bash
npm install
```
3. Set up MongoDB:
- Ensure MongoDB is installed and running on your system
- Configure the database connection in `core/config/db.js`

4. Start the application:
```bash
npm start
```

The server will start on port 3050 by default.

## Project Structure

```
├── backend/
│   ├── controllers/         # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   ├── src/              # Main application setup
│   ├── uploads/          # Media upload directory
│   └── views/            # EJS templates
├── core/
│   ├── config/           # Configuration files
│   ├── models/           # Database models
│   └── utils/            # Utility functions
├── frontend/
│   ├── assets/           # Static assets
│   ├── components/       # React components
│   ├── styles/           # CSS styles
│   └── utils/            # Frontend utilities
├── app.js               # Application entry point
└── package.json        # Project dependencies
```
## License

MIT License

## Author

Ramya Sri Kodem,Sai Mourya Kakkireni

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
