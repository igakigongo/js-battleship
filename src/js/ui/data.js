import Coordinate from '../models/coordinate';
import Ship from '../models/ship.factory';

export const getComputerShips = () => [
  new Ship([new Coordinate(5, 0), new Coordinate(5, 1)]),
  new Ship([new Coordinate(9, 1)]),
  new Ship([new Coordinate(0, 2), new Coordinate(1, 2)]),
  new Ship([new Coordinate(6, 3), new Coordinate(7, 3),
    new Coordinate(8, 3), new Coordinate(9, 3)]),
  new Ship([new Coordinate(5, 5), new Coordinate(6, 5)]),
  new Ship([new Coordinate(9, 5)]),
  new Ship([new Coordinate(1, 6), new Coordinate(1, 7),
    new Coordinate(1, 8)]),
  new Ship([new Coordinate(4, 7), new Coordinate(4, 8),
    new Coordinate(4, 9)]),
  new Ship([new Coordinate(6, 9)]),
  new Ship([new Coordinate(9, 9)]),
];

export const getHumanShips = () => [
  new Ship([new Coordinate(6, 0)]),
  new Ship([new Coordinate(0, 1), new Coordinate(1, 1),
    new Coordinate(2, 1), new Coordinate(3, 1)]),
  new Ship([new Coordinate(5, 2)]),
  new Ship([new Coordinate(7, 2), new Coordinate(7, 3)]),
  new Ship([new Coordinate(0, 3), new Coordinate(1, 3)]),
  new Ship([new Coordinate(0, 5), new Coordinate(0, 6),
    new Coordinate(0, 7)]),
  new Ship([new Coordinate(8, 5)]),
  new Ship([new Coordinate(5, 6)]),
  new Ship([new Coordinate(7, 7), new Coordinate(8, 7)]),
  new Ship([new Coordinate(3, 8), new Coordinate(4, 8),
    new Coordinate(5, 8)]),
];