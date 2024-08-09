const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);

router.get('/users', auth, async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude password
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
