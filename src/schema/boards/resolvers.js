const { pick } = require('ramda')

const getBoardById = async (_, args, { models: { Board } }) => {
  const board = await Board.findById(args.id)
  return board
}

const getBoardsByName = async (_, args, { models: { Board } }) => {
  const regexName = new RegExp(args.name, 'i')
  const boards = await Board.find({ name: regexName })
  return boards
}

const createBoard = async (_, args, { models: { Board } }) => {
  const boardParams = cleanBoardParameters(args)
  const newBoard = await Board.create(boardParams)
  return newBoard
}

const updateBoard = async (_, args, { models: { Board } }) => {
  const board = await Board.findByIdAndUpdate(
    args.id,
    cleanBoardParameters(args)
  )
  return board
}

const deleteBoard = async (_, args, { models: { Board } }) => {
  const board = await Board.findById(args.id)
  await board.remove()
  return board
}

const getLists = async (board, _, { models: { List } }) => {
  const lists = await List.find({ board: board._id }).populate('board')
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
