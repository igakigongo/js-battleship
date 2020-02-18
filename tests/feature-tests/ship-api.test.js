import Ship from '../../src/models/ship.factory';

describe('ship api', () => {
  it('ship.hit() throws error if a position is not a number', () => {
    const ship = new Ship([1, 2, 4, 5]);
    expect(() => ship.hit()).toThrow();
  });

  it('ship.hit() throws error if a position is not a valid ship position', () => {
    const ship = new Ship([1, 2, 4, 5]);
    expect(() => ship.hit(10)).toThrow();
  });

  it('ship.hit(5) marks a position as hit', () => {
    const ship = new Ship([1, 2, 4, 5]);
    expect(() => ship.hit(4)).not.toThrow();
  });

  it('is sunk when all positions are hit', () => {
    const positions = [1, 2, 4, 5];
    const ship = new Ship(positions);
    positions.forEach(p => ship.hit(p));
    expect(ship.isSunk).toBe(true);
  });

  it('yields a valid length', () => {
    expect(new Ship([1, 3, 5, 7]).length).toEqual(4);
  });
});