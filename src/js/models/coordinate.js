export default class Coordinate {
  constructor(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') throw new Error('Not a coordinate');
    this.x = x;
    this.y = y;
  }

  equals(other) {
    if (!(other instanceof Coordinate)) return false;
    const { x, y } = other;
    return x === this.x && y === this.y;
  }
}