import Ship from './ship.factory';

export default class GameBoard {
  constructor() {
    this.missedAttacks = [];
    this.ships = [];
  }

  get allShipsSunk() {
    return this.ships.reduce((a, ship) => a && ship.isSunk, true);
  }

  placeShipAt(coordinates) {
    for (let i = 0; i < coordinates.length; i += 1) {
      const c = coordinates[i];
      const taken = this.ships.some(ship => ship.occupiesGeoCoordinate(c));
      if (taken) {
        const { x, y } = c;
        throw new Error(`Position (${x}, ${y}) is already occupied by a ship`);
      }
    }
    this.ships.push(new Ship([...coordinates]));
  }

  receiveAttack(coordinate) {
    const ship = this.ships.find(ship => ship.coordinates.some(c => c.equals(coordinate)));
    if (ship) {
      ship.hit(coordinate);
      return;
    }
    this.missedAttacks.push(coordinate);
  }
}