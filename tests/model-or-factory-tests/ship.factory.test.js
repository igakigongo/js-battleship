import Ship from '../../src/models/ship.factory';


describe('ship factory', () => {
  it('throws an error if positions is not an array', () => {
    expect(() => new Ship()).toThrow();
    expect(() => new Ship({})).toThrow('Expected an array of positions');
  });

  it('throws an error if positions are empty', () => {
    expect(() => new Ship([])).toThrow('Positions can not be empty');
  });

  it('throws an error if an array with a non integer is passed in', () => {
    expect(() => new Ship([2, 5, 'x', 10])).toThrow();
  });

  it('creates a valid ship if all positions are numbers', () => {
    expect(() => new Ship([1, 2, 3, 4])).not.toThrow();
  });
});


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
});
