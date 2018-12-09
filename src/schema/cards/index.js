const {
  getCardById,
  getCardsByName,
  createCard,
  updateCard,
  deleteCard,
} = require('./resolvers')

const cardTypeDef = `
  extend type Query {
    card(id: String!): Card
    cards(name: String): [Card]
  }

  extend type Mutation {
    createCard(name: String!, list: String!): Card
    updateCard(id: String!, name: String!): Card
    deleteCard(id: String!): Card
  }

  type Card {
    id: String
    name: String
    list: List
  }
`

const cardResolver = {
  Query: {
    card: getCardById,
    cards: getCardsByName,
  },
  Mutation: {
    createCard,
    updateCard,
    deleteCard,
  },
  Card: {},
}

module.exports = {
  cardTypeDef,
  cardResolver,
}
