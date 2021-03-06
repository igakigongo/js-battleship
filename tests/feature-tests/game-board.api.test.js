import Coordinate from '../../src/js/models/coordinate';
import GameBoard from '../../src/js/models/game-board.factory';

describe('game board api', () => {
  const [coords1, coords2] = [
    [new Coordinate(0, 0), new Coordinate(0, 1)],
    [new Coordinate(5, 5), new Coordinate(5, 6)]];

  let board;
  beforeEach(() => {
    board = new GameBoard();
  });

  it('places a ship at specific coordinates', () => {
    board.placeShipAt([new Coordinate(1, 3)]);
    expect(board.ships.length).toEqual(1);
  });

  it('should not place a ship at a taken position', () => {
    board.placeShipAt(coords1);
    board.placeShipAt(coords2);
    const occupiedCoordinate = new Coordinate(5, 5);
    expect(board.ships.length).toEqual(2);
    expect(() => board.placeShipAt([occupiedCoordinate])).toThrow('Position (5, 5) is already occupied by a ship');
    expect(board.ships.length).toEqual(2);
  });

  it('should hit a ship at the specified position', () => {
    board.placeShipAt(coords1);
    board.placeShipAt(coords2);
    const targetCoordinate = new Coordinate(5, 6);
    board.receiveAttack(targetCoordinate);
    const { x, y } = targetCoordinate;
    const [key, missedAttacks] = [(x + y), board.missedAttacks.length];
    expect(board.ships[1].destructionMap.get(key)).toBe(true);
    expect(board.missedAttacks.length).toEqual(missedAttacks);
  });

  it('should record a missed attack', () => {
    board.placeShipAt(coords1);
    const targetCoordinate = new Coordinate(5, 6);
    const missedAttacks = board.missedAttacks.length;
    board.receiveAttack(targetCoordinate);
    expect(board.missedAttacks.length).toEqual(missedAttacks + 1);
  });

  it('should report true when all ships are sunk', () => {
    [coords1, coords2].forEach(coords => { board.placeShipAt(coords); });
    [...coords1, ...coords2].forEach(c => { board.receiveAttack(c); });
    expect(board.allShipsSunk).toBe(true);
  });

  it('should report false when some ships are not sunk', () => {
    [coords1, coords2].forEach(coords => { board.placeShipAt(coords); });
    [...coords2].forEach(c => { board.receiveAttack(c); });
    expect(board.allShipsSunk).toBe(false);
  });
});