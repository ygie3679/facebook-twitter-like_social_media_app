const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      username: {type: String, required: true},
      status_updates: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Status_updates'
      }],
      description: {type: String, required: false}
    },
    { timestamps: true });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);