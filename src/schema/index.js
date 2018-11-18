const { makeExecutableSchema } = require('graphql-tools')

const { mergeResolvers } = require('../utils')

const {
  boardTypeDef,
  boardResolver,
} = require('./boards')

const defaultTypeDef = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

const typeDefs = [
  defaultTypeDef,
  boardTypeDef,
]

const resolvers = mergeResolvers([
  boardResolver,
])

module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
})
