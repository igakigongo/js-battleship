import Coordinate from '../../src/models/coordinate';
import Ship from '../../src/models/ship.factory';

describe('ship api', () => {
  let ship;

  beforeEach(() => {
    const coordinates = [
      new Coordinate(0, 0),
      new Coordinate(0, 1),
      new Coordinate(0, 2),
    ];
    ship = new Ship(coordinates);
  });

  it('ship.hit() throws error if a position is not a coordinate', () => {
    expect(() => ship.hit()).toThrow();
  });

  it('ship.hit((0, 2)) marks a position as hit', () => {
    const targetCoordinate = new Coordinate(0, 2);
    expect(() => ship.hit(targetCoordinate)).not.toThrow();
    expect(ship.destructionMap.size).toEqual(1);
  });

  it('does not alter the state of the ship with a non valid position', () => {
    const targetCoordinate = new Coordinate(0, 3);
    expect(() => ship.hit(targetCoordinate)).not.toThrow();
    expect(ship.destructionMap.size).toEqual(0);
  });

  it('is sunk when all positions are hit', () => {
    ship.coordinates.forEach(c => ship.hit(c));
    expect(ship.isSunk).toBe(true);
  });

  it('yields a valid length', () => {
    expect(ship.length).toEqual(3);
  });
});