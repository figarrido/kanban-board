const casual = require('casual')
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList,
} = require('graphql-tools')
const { graphql } = require('graphql')

const { typeDefs } = require('../../src/schema')
const { concatErrors } = require('../helpers')

describe('Board Schema', () => {
  const mockSchema = makeExecutableSchema({ typeDefs })

  it('should return a list of boards', async done => {
    const length = 8
    addMockFunctionsToSchema({
      schema: mockSchema,
      mocks: {
        Query: () => ({
          boards: () => new MockList(length),
        }),
        Board: () => ({
          id: () => casual.integer(1, 1000).toString(),
          name: casual.title,
        })
      },
    })

    const query = `
      query {
        boards {
          id,
          name
        }
      }
    `

    try {
      const response = await graphql(mockSchema, query)
      if (response.errors) {
        const messageError = concatErrors(response.errors)
        throw new Error(messageError)
      }
      expect(response.data.boards).not.toBeUndefined()
      expect(response.data.boards).toHaveLength(length)
      done()
    } catch (err) {
      done.fail(err)
    }
  })

  it('should return a board', async done => {
    addMockFunctionsToSchema({
      schema: mockSchema,
      mocks: {
        Board: () => ({
          id: () => casual.integer(1, 1000).toString(),
          name: casual.name,
        })
      }
    })

    const query = `
      query {
        board(id: "1") {
          name
        }
      }
    `

    try {
      const response = await graphql(mockSchema, query)
      if (response.errors) {
        const messageError = concatErrors(response.errors)
        throw new Error(messageError)
      }
      expect(response.data.board).toBeDefined()
      expect(response.data.board.name).toBeTruthy()
      done()
    } catch (err) {
      done.fail(err)
    }
  })

  it('should create a board', async done => {
    const query = `
      mutation {
        createBoard(name: "Board name") {
          name
        }
      }
    `

    try {
      const response = await graphql(mockSchema, query)
      if (response.errors) {
        const messageError = concatErrors(response.errors)
        throw new Error(messageError)
      }
      expect(response.data.createBoard).toBeDefined()
      expect(response.data.createBoard.name).toBeTruthy()
      done()
    } catch (err) {
      done.fail(err)
    }
    done()
  })

  it('should upadte a board', async done => {
    const query = `
      mutation {
        updateBoard(id: "1", name: "Board name") {
          name
        }
      }
    `

    try {
      const response = await graphql(mockSchema, query)
      if (response.errors) {
        const messageError = concatErrors(response.errors)
        throw new Error(messageError)
      }
      expect(response.data.updateBoard).toBeDefined()
      expect(response.data.updateBoard.name).toBeTruthy()
      done()
    } catch (err) {
      done.fail(err)
    }
    done()
  })

  it('should delete a board', async done => {
    const query = `
      mutation {
        deleteBoard(id: "1") {
          name
        }
      }
    `

    try {
      const response = await graphql(mockSchema, query)
      if (response.errors) {
        const messageError = concatErrors(response.errors)
        throw new Error(messageError)
      }
      expect(response.data.deleteBoard).toBeDefined()
      expect(response.data.deleteBoard.name).toBeTruthy()
      done()
    } catch (err) {
      done.fail(err)
    }
    done()
  })
})
