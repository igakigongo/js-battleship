import Player from './player-factory';
import Coordinate from './coordinate';

const getRandomInt = (minValue, maxValue) => {
  minValue = Math.ceil(minValue);
  maxValue = Math.floor(maxValue);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export default class ComputerPlayer extends Player {
  isMovePlayed(coordinate) {
    return this.movesPlayed.some(c => c.equals(coordinate));
  }

  static generateCoordinate(gridSize) {
    const [x, y] = [1, 1].map(() => getRandomInt(0, gridSize - 1));
    return new Coordinate(x, y);
  }

  generateMove(gridSize) {
    let coordinate = ComputerPlayer.generateCoordinate(gridSize);
    while (this.isMovePlayed(coordinate)) {
      coordinate = ComputerPlayer.generateCoordinate(gridSize);
    }
    this.movesPlayed.push(coordinate);
    return coordinate;
  }
}