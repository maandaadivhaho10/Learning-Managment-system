const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Quizzes route' });
});

module.exports = router;