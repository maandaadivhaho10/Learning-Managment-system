const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Courses route' });
});

module.exports = router;