const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

//register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).send({ message: 'Error registering user' });
  }
});

//login user endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Wrong credentials' });
    }

    const token = await generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    res.status(200).send({
      message: 'Logged in succesfully!',
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error('Error logging user', error);
    res.status(500).send({ message: 'Error logging user' });
  }
});

//all users
// router.get('/users', verifyToken, async (req, res) => {
//   res.send({ message: 'Protected route' });
// });

module.exports = router;
