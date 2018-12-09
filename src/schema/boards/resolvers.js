const { pick } = require('ramda')

const getBoardById = async (_, args, { models: { Board } }) => {
  const board = await Board.findById(args.id)
  return board
}

const getBoardsByName = async (_, args, { models: { Board } }) => {
  const boards = await Board.where(args)
  return boards
}

const createBoard = async (_, args, { models: { Board } }) => {
  const boardParams = cleanBoardParameters(args)
  const newBoard = await Board.create(boardParams)
  return newBoard
}

const updateBoard = async (_, args, { models: { Board } }) => {
  const boardParams = cleanBoardParameters(args)
  const board = await Board.updateWith(args.id, boardParams)
  return board
}

const deleteBoard = async (_, args, { models: { Board } }) => {
  const board = await Board.removeWithId(args.id)
  return board
}

const getLists = async (board, _, { models: { List } }) => {
  const lists = await List.getFromBoard(board.id)
  return lists
}

module.exports = {
  getBoardById,
  getBoardsByName,
  createBoard,
  updateBoard,
  deleteBoard,
  getLists,
}

const cleanBoardParameters = pick(['name'])
