const { pick } = require('ramda')

const getCardById = async (_, args, { models: { Card } }) => {
  const card = await Card.findById(args.id)
  return card
}

const getCardsByName = async (_, args, { models: { Card } }) => {
  const cards = await Card.where(args)
  return cards
}

const createCard = async (_, args, { models: { Card } }) => {
  const cardParams = cleanCardParameters(args)
  const newCard = await Card.create(cardParams)
  return newCard
}

const updateCard = async (_, args, { models: { Card } }) => {
  const cardParams = cleanCardParameters(args)
  const card = await Card.updateWith(args.id, cardParams)
  return card
}

const deleteCard = async (_, args, { models: { Card } }) => {
  const card = await Card.removeWithId(args.id)
  return card
}

module.exports = {
  getCardById,
  getCardsByName,
  createCard,
  updateCard,
  deleteCard,
}

const cleanCardParameters = pick(['name', 'list'])
