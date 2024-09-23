// backend/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/number', auth, (req, res) => {
  const { level, language } = req.query;
  
  // Logic to generate a number based on the level and language
  const digitCount = 6 + level; // Example logic: start with 6 digits and increase with level
  let number = generateNumber(digitCount); // Generate a random number of digitCount length

  if (language !== 'spanish') {
    number = translateNumber(number, language); // Pseudo-function to translate number to the given language
  }

  res.json({ number });
});

const generateNumber = (digitCount) => {
  return Math.floor(Math.random() * Math.pow(10, digitCount)).toString();
};

const translateNumber = (number, language) => {
  // Implement logic to translate numbers to words in different languages
  // This could involve a simple lookup or more advanced logic
  return number; // Placeholder
};

module.exports = router;
