const { makeExecutableSchema } = require('graphql-tools')

const { mergeResolvers } = require('../utils')

const {
  userTypeDef,
  userResolver,
} = require('./users')

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
  userTypeDef,
]

const resolvers = mergeResolvers([
  userResolver,
])

module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
})
