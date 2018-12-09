const {
  mergeResolvers,
  concatTypeDefs,
} = require('../utils')

const {
  boardTypeDef,
  boardResolver,
} = require('./boards')

const {
  cardTypeDef,
  cardResolver,
} = require('./cards')

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
  cardTypeDef,
])

const resolvers = mergeResolvers([
  boardResolver,
  listResolver,
  cardResolver,
])

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
}
