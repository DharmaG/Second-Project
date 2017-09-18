const express = require('express');
const router  = express.Router();

router.get('/topics', (req, res, next) => {
  res.render('./topics/mongoose.ejs');
});

module.exports = router;
