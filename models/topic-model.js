const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicSchema = new Schema(
    {
      topic: {
        type: String,
        required: [true, 'Please provide the topic name']
      },
      imageUrl: {
        type: String
      },
       description: {
         type: String,
         required: [true, 'Please provide the topic description']
       },
       steps: {
         type: String,
       }

    }

);

const TopicModel = mongoose.model('Topic', topicSchema);

module.exports = TopicModel;
