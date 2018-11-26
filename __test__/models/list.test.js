const { List, Board } = require('../../src/models')

describe('List', () => {
  it('should be created', async () => {
    const listName = 'List name'
    const board = new Board({ name: 'Board name' })
    const newList = new List({ name: listName, board })

    await newList.validate()

    expect(newList).not.toBeNull()
    expect(newList.name).toBe(listName)
    expect(newList.board).toEqual(board)
  })

  it('should be created assigning attributes', async () => {
    const listName = 'List name'
    const board = new Board({ name: 'Board name' })
    const newList = new List()

    newList.name = listName
    newList.board = board

    await newList.validate()

    expect(newList).not.toBeNull()
    expect(newList.name).toBe(listName)
    expect(newList.board).toEqual(board)
  })
})
