const create = ({ name }) => `
  mutation {
    createBoard(name: "${name}") {
      id
      name
    }
  }
`

const update = ({ id, name }) => `
  mutation {
    updateBoard(id: "${id}", name: "${name}") {
      id
      name
    }
  }
`

const deleteOne = ({ id }) => `
  mutation {
    deleteBoard(id: "${id}") {
      id
      name
    }
  }
`

const getAll = () => `
  query {
    boards {
      id
      name
    }
  }
`
const getOne = ({ id }) => `
  query {
    board(id: "${id}") {
      id
      name
    }
  }
`
module.exports = {
  create,
  update,
  deleteOne,
  getAll,
  getOne,
}
