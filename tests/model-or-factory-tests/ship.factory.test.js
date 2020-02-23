import Coordinate from '../../src/js/models/coordinate';
import Ship from '../../src/js/models/ship.factory';

describe('ship factory', () => {
  it('throws an error if positions is not an array', () => {
    expect(() => new Ship()).toThrow();
    expect(() => new Ship({})).toThrow('Expected an array of coordinates');
  });

  it('throws an error if positions are empty', () => {
    expect(() => new Ship([])).toThrow('Coordinates can not be empty');
  });

  it('throws an error if any position is not a coordinate', () => {
    const coordinates = [
      new Coordinate(0, 0),
      {},
    ];
    expect(() => new Ship(coordinates)).toThrow('Invalid coordinate at index 1');
  });

  it('should return true if ship occupies some coordinate', () => {
    const coordinates = [
      new Coordinate(0, 0),
      new Coordinate(0, 1),
      new Coordinate(0, 2),
    ];
    const ship = new Ship(coordinates);
    expect(ship.occupiesGeoCoordinate(new Coordinate(0, 2))).toBe(true);
  });

  it('creates a valid ship if all positions are valid coordinates', () => {
    const coordinates = [
      new Coordinate(0, 0),
      new Coordinate(0, 1),
      new Coordinate(0, 2),
    ];
    expect(() => new Ship(coordinates)).not.toThrow();
  });
});
