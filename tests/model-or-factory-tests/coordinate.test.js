import Coordinate from '../../src/js/models/coordinate';

describe('coordinate', () => {
  it('should be equal for instances with same x and y values', () => {
    const c1 = new Coordinate(1, 2);
    const c2 = new Coordinate(1, 2);
    expect(c1.equals(c2)).toBe(true);
  });

  it('should fail when comparing a coordinate to a non coordinate', () => {
    const c1 = new Coordinate(1, 2);
    expect(c1.equals({})).toBe(false);
  });

  it('throws an exception if non-integers are passed in', () => {
    expect(() => new Coordinate('1', 2)).toThrow();
  });
});
