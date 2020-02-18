export default class Ship {
  constructor(positions) {
    if (Array.isArray(positions) === false) throw new Error('Expected an array of positions');

    if (positions.length === 0) throw new Error('Positions can not be empty');

    for (let i = 0; i < positions.length;) {
      if (typeof positions[i] !== 'number') {
        throw new Error(`${positions[i]} is not a number`);
      }
      i += 1;
    }

    const array = positions.map(p => [p, false]);
    this.positions = new Map(array);
  }

  get isSunk() {
    let sunk = true;
    this.positions.forEach(value => {
      sunk = sunk && value;
    });
    return sunk;
  }

  get length() {
    let len = 0;
    this.positions.forEach(() => { len += 1; });
    return len;
  }

  hit(position) {
    if (typeof position !== 'number') throw new Error(`${position} is not a number`);
    const iterator = this.positions.keys();
    let { value, done } = iterator.next();
    while (!done) {
      if (value === position) {
        this.positions.set(position, true);
        return;
      }
      const nextValue = iterator.next();
      done = nextValue.done;
      value = nextValue.value;
    }
    throw new Error(`Ship does not contain the position: ${position}`);
  }
}