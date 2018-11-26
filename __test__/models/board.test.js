const Board = require('../../src/models/board')

describe('Board', () => {
  it('should be created with its attributes', async () => {
    const boardName = 'Test Board'
    const board = new Board({ name: boardName })

    await board.validate()

    expect(board).not.toBeNull()
    expect(board.name).toBe(boardName)
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
