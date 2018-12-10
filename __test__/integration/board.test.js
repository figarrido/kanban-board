const { ApolloServer } = require('apollo-server-koa')
const { createTestClient } = require('apollo-server-testing')

const {
  connect: connectMongo,
  clearCollections,
  disconnect,
} = require('../../src/config/database')
const { typeDefs, resolvers } = require('../../src/schema')
const models = require('../../src/models')
const { board } = require('../query')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
})
const { query, mutate } = createTestClient(server)

describe('Board', () => {
  beforeAll(() => connectMongo())

  beforeEach(async done => {
    await clearCollections(models)
    done()
  })

  afterAll(async done => {
    await clearCollections(models)
    await disconnect()
    done()
  })

  it('should create one board', async done => {
    const boardName = 'Some board name'

    const { data: { createBoard: newBoard } } = await mutate({
      mutation: board.create({ name: boardName }),
    })

    expect(newBoard).toBeDefined()
    expect(newBoard).toHaveProperty('id')
    expect(newBoard).toHaveProperty('name')
    expect(newBoard.name).toBe(boardName)

    const { data: { boards } } = await query({
      query: board.getAll(),
    })

    expect(boards).toHaveLength(1)
    expect(boards[0]).toHaveProperty('id')
    expect(boards[0]).toHaveProperty('name')
    expect(boards[0].id).toBe(newBoard.id)
    expect(boards[0].name).toBe(boardName)

    done()
  })

  it('should update a board', async done => {
    const originalBoardName = 'Some original board name'
    const updatedBoardName = 'Updated board name'

    const { data: { createBoard: newBoard } } = await mutate({
      mutation: board.create({ name: originalBoardName }),
    })

    expect(newBoard).toBeDefined()
    expect(newBoard).toHaveProperty('id')
    expect(newBoard).toHaveProperty('name')
    expect(newBoard.name).toBe(originalBoardName)
    const { data: { updateBoard: updatedBoard } } = await mutate({
      mutation: board.update({ id: newBoard.id, name: updatedBoardName }),
    })

    expect(updatedBoard).toHaveProperty('id')
    expect(updatedBoard.id).toBe(newBoard.id)

    const { data: { boards } } = await query({
      query: board.getAll(),
    })

    expect(boards).toHaveLength(1)
    expect(boards[0].id).toBe(updatedBoard.id)
    expect(boards[0].name).toBe(updatedBoardName)

    done()
  })
})
