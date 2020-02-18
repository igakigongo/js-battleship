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
