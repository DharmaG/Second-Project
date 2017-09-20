const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
       email: {
         type: String,
         required: true
       },

       encryptedPassword: { type: String },

       role: {
         type: String,
         enum: ['normal', 'admin'],
         default: 'normal'
       }
    },

);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
