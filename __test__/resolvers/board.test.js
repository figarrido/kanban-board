const {
  head,
  filter,
  pipe,
  propEq,
  find,
  merge,
  pick,
} = require('ramda')

const {
  getBoardById,
  getBoardsByName,
  createBoard,
  updateBoard,
  deleteBoard,
} = require('../../src/schema/boards/resolvers')

describe('Board resolver', () => {
  const db = [
    { id: '1', name: 'First board' },
    { id: '2', name: 'Second board' },
    { id: '3', name: 'Third board' },
  ]

  beforeEach(jest.clearAllMocks)

  const findById = jest.fn(id => pipe(
    filter(propEq('id', id)),
    head,
  )(db))

  it('should return a board by id', async () => {
    const parent = {}
    const args = { id: '1' }
    const ctx = {
      models: {
        Board: {
          findById,
        },
      },
    }

    const board = await getBoardById(parent, args, ctx)
    expect(board).toEqual(db[0])
    expect(findById.mock.calls).toHaveLength(1)
    expect(findById.mock.calls[0][0]).toBe(args.id)
  })

  it('should return a list of boards', async () => {
    const where = jest.fn(({ name }) => filter(
      obj => obj.name.toLowerCase().includes(name.toLowerCase())
    )(db))

    const parent = {}
    const args = { name: 'board' }
    const ctx = {
      models: {
        Board: {
          where,
        },
      },
    }

    const boards = await getBoardsByName(parent, args, ctx)
    expect(boards).toEqual(db)
    expect(where.mock.calls).toHaveLength(1)
    expect(where.mock.calls[0][0]).toEqual({ name: args.name })

  })

  it('should create a board', async () => {
    const create = jest.fn(merge({ id: '1' }))

    const parent = {}
    const args = { name: 'Board' }
    const ctx = {
      models: {
        Board: {
          create,
        },
      },
    }

    const newBoard = await createBoard(parent, args, ctx)
    expect(newBoard).toEqual(merge(args, { id: '1' }))
    expect(create.mock.calls).toHaveLength(1)
    expect(create.mock.calls[0][0]).toEqual(args)
  })

  it('should update a board by id', async () => {
    const updateWith = jest.fn((id, fields) => merge(find(propEq('id', id), db), fields))

    const parent = {}
    const args = { id: '1', name: 'Board' }
    const ctx = {
      models: {
        Board: {
          updateWith,
        },
      },
    }

    const updatedBoard = await updateBoard(parent, args, ctx)
    expect(pick(['id', 'name'], updatedBoard)).toEqual(merge(args, { id: '1' }))
    expect(updateWith.mock.calls).toHaveLength(1)
    expect(updateWith.mock.calls[0][0]).toEqual(args.id)
  })

  it('should update a board by id', async () => {
    const removeWithId = jest.fn(id => find(propEq('id', id), db))

    const parent = {}
    const args = { id: '1' }
    const ctx = {
      models: {
        Board: {
          removeWithId,
        },
      },
    }

    const deletedBoard = await deleteBoard(parent, args, ctx)
    expect(pick(['id', 'name'], deletedBoard)).toEqual(pick(['id', 'name'], db[0]))
    expect(removeWithId.mock.calls).toHaveLength(1)
    expect(removeWithId.mock.calls[0][0]).toEqual(args.id)
  })
})
