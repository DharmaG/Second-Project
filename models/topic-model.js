const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicSchema = new Schema(
    {
      topic: {
        type: String,
        required: [true, 'Please provide the topic name']
      },
       description: {
         type: String,
         required: true
       },
       steps: {
         type: String,
       }

    },

);

const TopicModel = mongoose.model('Topic', topicSchema);

module.exports = TopicModel;
