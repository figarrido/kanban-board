const { pick } = require('ramda')

const getListById = async (_, args, { models: { List } }) => {
  const list = await List.findById(args.id)
  return list
}

const getListsByName = async (_, args, { models: { List } }) => {
  const regexName = new RegExp(args.name, 'i')
  const lists = await List.find({ name: regexName })
  return lists
}

const createList = async (_, args, { models: { List } }) => {
  const listParams = cleanListParameters(args)
  const list = await List.create(listParams)
  return list
}

const updateList = async (_, args, { models: { List } }) => {
  const list = await List.findByIdAndUpdate(
    args.id,
    cleanListParameters(args)
  )
  return list
}

const deleteList = async (_, args, { models: { List } }) => {
  const list = await List.findById(args.id)
  await list.remove()
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
