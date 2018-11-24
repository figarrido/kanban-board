const {
  makeExecutableSchema,
  mockServer,
} = require('graphql-tools')

const { typeDefs } = require('../../src/schema')

describe('Schema', () => {
  const mockSchema = makeExecutableSchema({ typeDefs })

  it('has valid schema', async done => {
    const MockServer = mockServer(mockSchema)
    try {
      await MockServer.query('__schema { types { name } }')
      done()
    } catch (err) {
      done.fail(err)
    }
  })
})
