// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to protect routes
const { register, login, getUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/user', auth, getUser); // Add this route

module.exports = router;
