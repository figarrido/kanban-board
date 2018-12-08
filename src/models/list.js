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
    required: true,
  },
}, {
  timestamps: {},
})

ListSchema.pre('find', function() {
  this.populate('board')
})

ListSchema.pre('save', async function(next) {
  await this.populate('board').execPopulate()
  next()
})

const List = mongoose.model('List', ListSchema)

module.exports = List
