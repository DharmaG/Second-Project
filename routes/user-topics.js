const express = require('express');
const multer = require('multer');

const TopicModel = require('../models/topic-model.js');

const router  = express.Router();

const myUploader = multer(
  {
    dest: __dirname + '/../public/uploads'
  }
);


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

router.post('/topics', myUploader.single('topicPhoto'),

(req, res, next) => {

  const theTopic = new TopicModel({
    topic:         req.body.topicName,
    imageUrl:      '/uploads/' + req.file.filename,
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

router.get('/topics/:topicId/edit', (req, res, next) => {
    if (req.user === undefined) {
        // req.flash('securityError', 'Log in to edit your rooms.');
        res.redirect('/user-topics');
        return;
    }

  TopicModel.findById(
    req.params.topicId,

    (err, topicFromDb) => {
      if(err) {
        next(err);
        return;
      }

      //redirect if you don't own this room
      // console.log(req.user);
      // if (topicFromDb.owner.toString() !== req.user._id.toString()) {
      //   // req.flash('securityError', 'You can only eit your rooms.');
      //   res.redirect('/topics');
      //   return;
      // }
      res.locals.topicInfo = topicFromDb;

      res.render('active-user-view/topic-edit.ejs');
    }

  ); //close TopicModel.findById( ...)
}); // close GET /rooms/:topicId/edit

router.post('/topics/:topicId',

myUploader.single('topicPhoto'),


(req, res, next) => {


  TopicModel.findById(
    req.params.topicId,

    (err, topicFromDb) => {
      if (err) {
        next(err);
        return;
      }

      console.log('the desc' + req.body.topicDesc);
      // if (topicFromDb.owner.toString() !== req.user._id.toString()) {
      //   // req.flash('securityError', 'You can only eit your rooms.');
      //   res.redirect('/user-topics');
      //   return;
      // }
      // "req.file" will be undefined if the user doesn't upload anythig

      // update "photoUrl" only if the user
      topicFromDb.topic = req.body.topicName;
      // topicFromDb.topic = req.body.topicImageUrl;
      topicFromDb.description = req.body.topicDesc;

      console.log(req.body);

      if(req.file) {
        topicFromDb.photoUrl = '/uploads/' + req.file.filename;
      }

      topicFromDb.save((err) => {
        if(err) {
          next(err);
          return;
        }

        // req.flash('updateSuccess', 'Room update Succesful.');
        res.redirect('/user-topics');
      }); // close roomFromDb.save((err)...)
    }
  ); // close RoomModel.findById
}); // close POST /rooms/:roomId










module.exports = router;
