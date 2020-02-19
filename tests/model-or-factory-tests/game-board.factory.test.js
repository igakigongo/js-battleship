import GameBoard from '../../src/models/game-board.factory';

describe('game board factory', () => {
  it.only('creates a size x size board on creation', () => {
    const size = 10;
    const board = new GameBoard(size);
    expect(board.slots.length).toEqual(size);
    expect(board.slots.every(slot => slot.length === size)).toBe(true);
  });
});