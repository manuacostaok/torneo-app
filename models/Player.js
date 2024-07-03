const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  victories: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
