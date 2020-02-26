import ComputerPlayer from '../../src/js/models/computer-player';
import Coordinate from '../../src/js/models/coordinate';

describe('computer player api', () => {
  let computer;
  beforeEach(() => {
    computer = new ComputerPlayer();
  });

  it('generates a valid move', () => {
    const coordinate = computer.generateMove(10);
    expect(coordinate).toBeInstanceOf(Coordinate);
  });

  it('records each move played', () => {
    const totalMoves = 10;
    for (let i = 0; i < totalMoves; i += 1) {
      computer.generateMove(10);
    }

    expect(computer.movesPlayed.length).toEqual(totalMoves);
  });

  it('should generate non repeated moves', () => {
    const totalMoves = 100;
    const moves = [];
    for (let i = 0; i < totalMoves; i += 1) {
      computer.generateMove(10);
    }

    const repeated = computer.movesPlayed.reduce((a, c) => {
      const seen = moves.some(cord => cord.equals(c));
      if (!seen) {
        moves.push(c);
      }
      return a && seen;
    }, false);
    expect(moves.length).toEqual(totalMoves);
    expect(repeated).toBe(false);
  });
});