const mongoose = require('mongoose')
const { Schema } = mongoose

const BoardSchema = new Schema({
  name: String,
})

const Board = mongoose.model('Board', BoardSchema)

module.exports = Board
