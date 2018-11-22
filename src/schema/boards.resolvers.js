const getBoardById = async (_, args, { models: { Board } }) => {
  const board = await Board.findById(args.id)
  return board
}

const getBoardsByName = async (_, args, { models: { Board } }) => {
  const regexName = new RegExp(args.name, 'i')
  return await Board.find({ name: regexName })
}

const createBoard = async (_, args, { models: { Board } }) => {
  const newBoard = await Board.create(args)
  return newBoard
}

const updateBoard = async (_, args, { models: { Board } }) => {
  const board = await Board.findById(args.id)
  board.name = args.name
  await board.save()
  return board
}

const deleteBoard = async (_, args, { models: { Board } }) => {
  const board = await Board.findById(args.id)
  await board.remove()
  return board
}

module.exports = {
  getBoardById,
  getBoardsByName,
  createBoard,
  updateBoard,
  deleteBoard,
}
