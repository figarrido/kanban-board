const { mergeResolvers, concatTypeDefs } = require('../utils')

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

const typeDefs = concatTypeDefs([
  defaultTypeDef,
  boardTypeDef,
])

const resolvers = mergeResolvers([
  boardResolver,
])

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
}
