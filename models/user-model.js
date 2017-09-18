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

       encryptedPassword: { type: String }
    },

);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
