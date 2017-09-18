const express = require('express');

const TopicModel = require('../models/topic-model.js');

const router  = express.Router();


router.get('/user-topics', (req, res, next) => {
  TopicModel.find((err, allTopics) => {
    if(err){
      next(err);
      return;
    }
    res.locals.listOfTopics = allTopics;
    res.render('active-user-view/active-user.ejs');
  });

});

router.get('/topics/new', (req, res, next) => {
  res.render('active-user-view/topic-form.ejs');
});

router.post('/topics', (req, res, next) => {

  const theTopic = new TopicModel({
    topic:         req.body.topicName,
    description:   req.body.topicDescription
  });

  theTopic.save((err) => {
    console.log(err);
    if (err && theTopic.errors) {
      res.locals.errorMessages = theTopic.errors;
      res.render('active-user-view/topic-form.ejs');
      return;
    }

    if (err && theTopic.errors) {
      next(err);
      return;
    };

    res.redirect('/user-topics');
  });
});

router.get('/topics/:topicId', (req, res, next) => {
  TopicModel.findById(
    req.params.topicId,

    (err, topicFromDb) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.topicInfo = topicFromDb;

      res.render('active-user-view/topic-info.ejs');
    }
  );
});

router.get('/topics/:topicId/delete', (req, res, next) => {
  TopicModel.findByIdAndRemove(
    req.params.topicId,

    (err, topicInfo) => {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/user-topics');
    }
  );
});

// router.post('/topics/:topicId', (req, res, next) => {
//   TopicModel.findById(
//     req.params.prodId,
//
//     (err, topicFromDb) => {
//       if(err){
//         next(err);
//         return;
//       }
//
//       topicFromDb.name = req.body.topicName;
//       topicFromDb.description = req.body.topicDescription;
//
//       topicFromDb.save((err) => {
//         if(err) {
//           next(err);
//           return;
//         }
//
//         res.redirect('/user-topics');
//       });
//     }
//   );
// });









module.exports = router;
