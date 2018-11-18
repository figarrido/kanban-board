const { Board } = require('../models')

const userTypeDef = `
  extend type Query {
    users: [User]
  }

  type User {
    email: String
  }
`

const userResolver = {
  Query: {
    users: () => {}
  },
  User: {
    email: user => {}
  }
}

module.exports = {
  userTypeDef,
  userResolver,
}
