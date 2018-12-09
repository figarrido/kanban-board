const mongoose = require('mongoose')

const { Schema } = mongoose

const CardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
}, {
  timestamps: {},
})

class CardClass {
  static where({ name }) {
    const regexName = new RegExp(name, 'i')
    return this.find({ name: regexName })
  }

  static updateWithId(id, fields) {
    return this.findByIdAndUpdate(id, fields, { new: true })
  }

  static async removeWithId(id) {
    const card = await this.findById(id)
    await card.remove()
    return card
  }

  static getFromList(listId) {
    return this.find({ list: listId }).populate('list')
  }
}

CardSchema.pre('find', function() {
  this.populate('list')
})

CardSchema.pre('save', async function(next) {
  await this.populate('list').execPopulate()
  next()
})

CardSchema.loadClass(CardClass)

const Card = mongoose.model('Card', CardSchema)

module.exports = Card
