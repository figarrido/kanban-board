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
    email: () => {}
  }
}

module.exports = {
  userTypeDef,
  userResolver,
}
