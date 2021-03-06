const mongoose = require('mongoose')

const List = require('./list')

const { Schema } = mongoose

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: {},
})

class BoardClass {
  static where({ name }) {
    const regexName = new RegExp(name, 'i')
    return this.find({ name: regexName })
  }

  static updateWithId(id, fields) {
    return this.findByIdAndUpdate(id, fields, { new: true })
  }

  static async removeWithId(id) {
    const board = await this.findById(id)
    await board.remove()
    return board
  }
}

BoardSchema.pre('remove', async function(next) {
  const lists = await List.find({ board: this._id })
  lists.forEach(async list => await list.remove())
  next()
})

BoardSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'board',
  justOne: false,
})

BoardSchema.loadClass(BoardClass)

const Board = mongoose.model('Board', BoardSchema)

module.exports = Board
