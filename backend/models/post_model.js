const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {type: String, required: true},
  userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
  },
  { timestamps: true }
);
postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema);