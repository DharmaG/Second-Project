const express = require('express');

const TopicModel = require('../models/topic-model.js');

const router = express.Router();



router.get('/topic/search', (req, res, next) => {
  res.render('variation-views/topic-search.ejs');
});

router.get('/topic/search-results', (req, res, next) => {
  const mySearchRegex = new RegExp(req.query.searchTerm, 'i');



  TopicModel.find(
    {
      $or:[
      {topic: mySearchRegex},
      {description: mySearchRegex},
      {steps: mySearchRegex}
      ]
    },

    // |
    // field from schema to searchResults
    //(check the model)

    (err, searchResults) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.lastSearch = req.query.searchTerm;
      res.locals.listOfTopics = searchResults;
      res.render('variation-views/results.ejs');

    }
  );
});





module.exports = router;
