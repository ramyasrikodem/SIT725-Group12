const User = require('../../core/models/user');

exports.getDashboard = async (req, res) => {
  try {
    const users = await User.find({}, 'email role').lean();
    // For stats, you can calculate or fetch from DB; here we use dummy data
    const stats = {
      total_scans: 100,
      fake_count: 30,
      real_count: 70,
    };
    res.render('adminDashboard', { users, stats });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.render('error', { error: 'Failed to load admin dashboard.' });
  }
};
