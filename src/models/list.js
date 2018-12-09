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

class ListClass {
  static where({ name }) {
    const regexName = new RegExp(name, 'i')
    return this.find({ name: regexName })
  }

  static updateWithId(id, fields) {
    return this.findByIdAndUpdate(id, fields, { new: true })
  }

  static async removeWithId(id) {
    const list = await this.findById(id)
    await list.remove()
    return list
  }

  static getFromBoard(boardId) {
    return this.find({ board: boardId }).populate('board')
  }
}

ListSchema.pre('find', function() {
  this.populate('board')
})

ListSchema.pre('save', async function(next) {
  await this.populate('board').execPopulate()
  next()
})

ListSchema.loadClass(ListClass)

const List = mongoose.model('List', ListSchema)

module.exports = List
