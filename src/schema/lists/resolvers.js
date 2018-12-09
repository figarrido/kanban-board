const { pick } = require('ramda')

const getListById = async (_, args, { models: { List } }) => {
  const list = await List.findById(args.id)
  return list
}

const getListsByName = async (_, args, { models: { List } }) => {
  const lists = await List.where(args)
  return lists
}

const createList = async (_, args, { models: { List } }) => {
  const listParams = cleanListParameters(args)
  const list = await List.create(listParams)
  return list
}

const updateList = async (_, args, { models: { List } }) => {
  const listParams = cleanListParameters(args)
  const list = await List.updateWithId(args.id, listParams)
  return list
}

const deleteList = async (_, args, { models: { List } }) => {
  const list = await List.removeWith(args.id)
  return list
}

module.exports = {
  getListById,
  getListsByName,
  createList,
  updateList,
  deleteList,
}

const cleanListParameters = pick(['name', 'board'])
