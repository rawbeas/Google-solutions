const User = require('../models/User');

exports.signUpUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: `${role} signed up successfully`, user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
