const Board = require('../../src/models/board')

describe('Board', () => {
  it('should be created', async () => {
    const board = new Board({ name: 'Test Board' })

    expect(board).not.toBeNull()
  })

  it('should fail if board has empty name', async done => {
    const board = new Board({ name: '' })

    try {
      await board.validate()
      done.fail(new Error('Board must have an empty name in this tests'))
    } catch ({ errors: { name: { message } } }) {
      expect(message).toMatch(/required/)
    }
    done()
  })
})
