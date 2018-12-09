const {
  getListById,
  getListsByName,
  createList,
  updateList,
  deleteList,
  getCards,
} = require('./resolvers')

const listTypeDef = `
  extend type Query {
    list(id: String!): List
    lists(name: String): [List]
  }

  extend type Mutation {
    createList(name: String!, board: String!): List
    updateList(id: String!, name: String!): List
    deleteList(id: String!): List
  }

  type List {
    id: String
    name: String
    board: Board
    cards: [Card]
  }
`

const listResolver = {
  Query: {
    list: getListById,
    lists: getListsByName,
  },
  Mutation: {
    createList,
    updateList,
    deleteList,
  },
  List: {
    cards: getCards,
  },
}

module.exports = {
  listTypeDef,
  listResolver,
}
