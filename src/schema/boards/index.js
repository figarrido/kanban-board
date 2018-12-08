const {
  getBoardById,
  getBoardsByName,
  createBoard,
  updateBoard,
  deleteBoard,
  getLists,
} = require('./resolvers')

const boardTypeDef = `
  extend type Query {
    board(id: String!): Board
    boards(name: String): [Board]
  }

  extend type Mutation {
    createBoard(name: String!): Board
    updateBoard(id: String!, name: String!): Board
    deleteBoard(id: String!): Board
  }

  type Board {
    id: String
    name: String
    lists: [List]
  }
`

const boardResolver = {
  Query: {
    board: getBoardById,
    boards: getBoardsByName,
  },
  Mutation: {
    createBoard,
    updateBoard,
    deleteBoard,
  },
  Board: {
    lists: getLists,
  },
}

module.exports = {
  boardTypeDef,
  boardResolver,
}
