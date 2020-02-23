import Coordinate from './coordinate';

export default class Ship {
  constructor(coordinates) {
    if (!Array.isArray(coordinates)) throw new Error('Expected an array of coordinates');

    if (coordinates.length === 0) throw new Error('Coordinates can not be empty');

    for (let i = 0; i < coordinates.length; i += 1) {
      if (!(coordinates[i] instanceof Coordinate)) throw new Error(`Invalid coordinate at index ${i}`);
    }

    this.coordinates = coordinates;
    this.destructionMap = new Map();
  }

  get isSunk() {
    return this.coordinates.every(c => {
      const { x, y } = c;
      const sum = x + y;
      return this.destructionMap.get(sum) === true;
    });
  }

  get length() {
    return this.coordinates.length;
  }

  /**
   * Determines if the ship occupies a certain coordinate
   * @param {Coordinate} coordinate
   */
  occupiesGeoCoordinate(coordinate) {
    return this.coordinates.some(c => c.equals(coordinate));
  }

  /**
   * Hits the position on the ship that matches the specified coordinates
   * @param {Coordinate} coordinate
   */
  hit(coordinate) {
    if (!(coordinate instanceof Coordinate)) throw new Error('Invalid coordinate');

    if (!this.occupiesGeoCoordinate(coordinate)) return;

    const { x, y } = coordinate;
    const sum = x + y;
    this.destructionMap.set(sum, true);
  }
}