const { Board } = require('../models')

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

const findBoardById = id => Board.findById(id)

const boardResolver = {
  Query: {
    board: async (parent, args, context, info) => {
      return await findBoardById(args.id)
    },
    boards: async (parent, args, context, info) => {
      const regexName = new RegExp(args.name, 'i')
      return await Board.find({ name: regexName })
    },
  },
  Mutation: {
    createBoard: async (parent, args, context, info) => {
      const newBoard = await Board.create(args)
      return newBoard
    },
    updateBoard: async (parent, args, context, info) => {
      const board = await findBoardById(args.id)
      board.name = args.name
      await board.save()
      return board
    },
    deleteBoard: async (parent, args, context, info) => {
      const board = await findBoardById(args.id)
      await board.remove()
      return board
    },
  },
  Board: {
    id: board => board._id.toString(),
    name: board => board.name
  }
}

module.exports = {
  boardTypeDef,
  boardResolver,
}
