const mongoose = require('mongoose')
const { Schema } = mongoose

const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
})

const List = mongoose.model('List', ListSchema)

module.exports = List
