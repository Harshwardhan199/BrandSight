const User = require('../models/user')
const Report = require('../models/Report')

const registerUser = async (req, res) => {
  const { UID, name, email, password } = req.body;

  const userExists = await User.findOne({ UID });
  if (userExists) {
    return res.status(201).json({ message: 'User already exists' });
  }

  const newUser = new User({UID, name, email, password });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

const getUserData = async (req, res) => {
  const { UID } = req.body;

  const user = await User.findOne({ UID });
  if (!user) return res.status(400).json({ message: 'User not found' });

  res.json({
    name: user.name,
  });
};

const getHistory = async (req, res) => {
  const { UID } = req.body;

  // Check if the user exists first (optional but a good practice)
  const user = await User.findOne({ UID });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    // Find all reports for the given UID
    const history = await Report
      .find({ uid: UID })             // Find all reports where UID matches
      .sort({ createdAt: -1 });       // Sort reports by date (newest to oldest)

    if (history.length === 0) {
      return res.status(404).json({ success: false, message: 'No reports found' });
    }

    return res.json({ success: true, count: history.length, data: history });
  } catch (err) {
    console.error('Error fetching history:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { registerUser, getUserData, getHistory };