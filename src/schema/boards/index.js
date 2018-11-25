const { pipe, prop, toString } = require('ramda')
const {
  getBoardById,
  getBoardsByName,
  createBoard,
  updateBoard,
  deleteBoard,
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
  }
`

const boardResolver = {
  Query: {
    board: getBoardById,
    boards: getBoardsByName,
  },
  Mutation: {
    createBoard: createBoard,
    updateBoard: updateBoard,
    deleteBoard: deleteBoard,
  },
  Board: {
    id: pipe(prop('_id'), toString),
    name: prop('name'),
  },
}

module.exports = {
  boardTypeDef,
  boardResolver,
}
