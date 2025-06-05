const bcrypt = require('bcrypt');
const User = require('../../core/models/user');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password.' });
    }
    req.session.userId = user._id;
    req.session.userRole = user.role;
    return res.redirect('/media/upload');
  } catch (error) {
    console.error('Login error:', error);
    return res.render('login', { error: 'An error occurred. Please try again.' });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { error: 'Email already registered.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, passwordHash });
    await newUser.save();
    return res.redirect('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    return res.render('register', { error: 'Registration failed. Please try again.' });
  }
};
