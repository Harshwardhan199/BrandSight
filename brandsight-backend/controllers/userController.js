const User = require('../models/user')

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

module.exports = { registerUser, getUserData };