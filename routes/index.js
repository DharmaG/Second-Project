const express = require('express');

const TopicModel = require('../models/topic-model.js');

const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index.ejs');
});


module.exports = router;
