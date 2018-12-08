const mongoose = require('mongoose')
const { Schema } = mongoose

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: {},
})

BoardSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'board',
  justOne: false,
})

const Board = mongoose.model('Board', BoardSchema)

module.exports = Board
