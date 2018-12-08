const {
  mergeResolvers,
  concatTypeDefs,
} = require('../utils')

const {
  boardTypeDef,
  boardResolver,
} = require('./boards')

const {
  listTypeDef,
  listResolver,
} = require('./lists')

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
  listTypeDef,
])

const resolvers = mergeResolvers([
  boardResolver,
  listResolver,
])

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
}
