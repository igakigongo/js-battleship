import Coordinate from '../../src/js/models/coordinate';
import GameBoard from '../../src/js/models/game-board.factory';

describe('game board api', () => {
  let board;
  beforeEach(() => {
    board = new GameBoard();
  });

  it('places a ship at specific coordinates', () => {
    board.placeShipAt([new Coordinate(1, 3)]);
    expect(board.ships.length).toEqual(1);
  });

  it('should not place a ship at a taken position', () => {
    board.placeShipAt([new Coordinate(0, 0), new Coordinate(0, 1)]);
    board.placeShipAt([new Coordinate(5, 5), new Coordinate(5, 6)]);
    expect(board.ships.length).toEqual(2);
    expect(() => board.placeShipAt([new Coordinate(5, 5)])).toThrow('Position (5, 5) is already occupied by a ship');
    expect(board.ships.length).toEqual(2);
  });

  it('should hit a ship at the specified position', () => {
    board.placeShipAt([new Coordinate(0, 0), new Coordinate(0, 1)]);
    board.placeShipAt([new Coordinate(5, 5), new Coordinate(5, 6)]);
    const targetCoordinate = new Coordinate(5, 6);
    board.receiveAttack(targetCoordinate);
    const { x, y } = targetCoordinate;
    const [key, missedAttacks] = [(x + y), board.missedAttacks.length];
    expect(board.ships[1].destructionMap.get(key)).toBe(true);
    expect(board.missedAttacks.length).toEqual(missedAttacks);
  });

  it('should record a missed attack', () => {
    board.placeShipAt([new Coordinate(0, 0), new Coordinate(0, 1)]);
    const targetCoordinate = new Coordinate(5, 6);
    const missedAttacks = board.missedAttacks.length;
    board.receiveAttack(targetCoordinate);
    expect(board.missedAttacks.length).toEqual(missedAttacks + 1);
  });

  it('should report true when all ships are sunk', () => {
    const coords1 = [new Coordinate(0, 0), new Coordinate(0, 1)];
    const coords2 = [new Coordinate(5, 5), new Coordinate(5, 6)];
    [coords1, coords2].forEach(coords => { board.placeShipAt(coords); });
    [...coords1, ...coords2].forEach(c => { board.receiveAttack(c); });
    expect(board.allShipsSunk).toBe(true);
  });

  it('should report false when some ships are not sunk', () => {
    const coords1 = [new Coordinate(0, 0), new Coordinate(0, 1)];
    const coords2 = [new Coordinate(5, 5), new Coordinate(5, 6)];
    [coords1, coords2].forEach(coords => { board.placeShipAt(coords); });
    [...coords2].forEach(c => { board.receiveAttack(c); });
    expect(board.allShipsSunk).toBe(false);
  });
});