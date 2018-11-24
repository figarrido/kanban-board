const {
  pipe,
  map,
  prop,
  join,
} = require('ramda')

const concatErrors = pipe(
  map(prop('message')),
  join('\n'),
)

module.exports = {
  concatErrors,
}
