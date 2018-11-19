const mongoose = require('mongoose')
const { Schema } = mongoose

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

const Board = mongoose.model('Board', BoardSchema)

module.exports = Board
