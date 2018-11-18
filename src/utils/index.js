const { reduce, mergeDeepRight} = require('ramda')

const mergeResolvers = resolvers => reduce(mergeDeepRight, {}, resolvers)

module.exports = {
  mergeResolvers,
}
