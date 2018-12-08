const {
  getListById,
  getListsByName,
  createList,
  updateList,
  deleteList,
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
  List: {},
}

module.exports = {
  listTypeDef,
  listResolver,
}
