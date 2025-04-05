// routes/dfaRoutes.js
const express = require('express');
const router = express.Router();
const simulateDFA  = require('../controllers/dfaController');

// Define routes
router.get('/', (req, res) => {
  res.send('DFA Home');
});
router.post('/simulate', simulateDFA);

module.exports = router;
