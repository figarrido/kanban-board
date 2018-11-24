const { reduce, mergeDeepRight, concat } = require('ramda')

const mergeResolvers = reduce(mergeDeepRight, {})
const concatTypeDefs = reduce(concat, '')

module.exports = {
  mergeResolvers,
  concatTypeDefs,
}
