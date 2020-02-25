import '../../css/app.scss';
import '../../assets/arrow.mp3';
import '../../assets/bomb.mp3';
import ComputerPlayer from '../models/computer-player';
import HumanPlayer from '../models/human-player';
import GameBoard from '../models/game-board.factory';
import Coordinate from '../models/coordinate';
import { getComputerShips, getHumanShips } from './data';

const game = (() => {
  const [computer, human] = [new ComputerPlayer(), new HumanPlayer()];
  const [computerBoard, humanBoard] = [new GameBoard(), new GameBoard()];
  let computerGrid;
  let humanGrid;
  let currentPlayer = human;
  let grids;

  const delay = (callback, durationInMilliseconds) => {
    if ((typeof callback) !== 'function') return;
    setTimeout(() => { callback(); }, durationInMilliseconds);
  };

  const getNextPlayerMessage = (player) => (player instanceof ComputerPlayer
    ? "Computer's Turn" : 'Your Turn');

  const showNotificationOnLabel = (message) => {
    const label = document.querySelector('#notifications');
    label.textContent = message;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer instanceof ComputerPlayer ? human : computer;
  };

  const generateComputerClick = () => {
    const { x, y } = currentPlayer.generateMove();
    const cell = humanGrid.querySelectorAll(`[data-x='${x}'][data-y='${y}']`)[0];
    cell.click();
  };

  const cellIsAlreadyHitOrMissed = (element) => {
    const { classList, innerHTML: text } = element;
    return classList.contains('hit') || text === '\u2022';
  };

  const markHitOrMiss = async (board, targetElement) => {
    const { classList, dataset: { x, y } } = targetElement;
    board.receiveAttack(new Coordinate(+x, +y));
    if (classList.contains('ship-location')) {
      targetElement.classList.remove('ship-location');
      targetElement.classList.add('hit');
      await (new Audio('bomb.mp3')).play();
    } else {
      targetElement.innerHTML = '\u2022';
      await (new Audio('arrow.mp3')).play();
    }
  };

  const handleClickMoveByComputer = async (e) => {
    if (humanBoard.allShipsSunk) return;

    const { target: targetElement } = e;
    if (currentPlayer instanceof HumanPlayer) {
      showNotificationOnLabel('Please wait for the human');
      return;
    }

    if (cellIsAlreadyHitOrMissed(targetElement)) {
      return;
    }

    const countOfMissedAttacks = humanBoard.missedAttacks.length;
    await markHitOrMiss(humanBoard, targetElement);

    if (humanBoard.allShipsSunk) {
      showNotificationOnLabel('Computer wins');
      return;
    }

    // Allow the computer to continue playing in case it did not miss
    if (countOfMissedAttacks === humanBoard.missedAttacks.length) {
      showNotificationOnLabel(`${getNextPlayerMessage(currentPlayer)} - Continue Playing`);
      delay(generateComputerClick, 250);
      return;
    }

    switchPlayer();
    showNotificationOnLabel(getNextPlayerMessage(currentPlayer));
  };

  const handleClickMoveByHuman = async (e) => {
    if (computerBoard.allShipsSunk) return;

    const { target: targetElement } = e;
    if (currentPlayer instanceof ComputerPlayer) {
      showNotificationOnLabel('Please wait for the computer');
      return;
    }

    if (cellIsAlreadyHitOrMissed(targetElement)) {
      return;
    }

    const countOfMissedAttacks = computerBoard.missedAttacks.length;
    await markHitOrMiss(computerBoard, targetElement);

    if (computerBoard.allShipsSunk) {
      showNotificationOnLabel('You win');
      return;
    }

    // Allow the user to continue playing in case they did not miss
    if (countOfMissedAttacks === computerBoard.missedAttacks.length) {
      showNotificationOnLabel(`${getNextPlayerMessage(currentPlayer)} - Continue Playing`);
      delay(() => {}, 250);
      return;
    }

    switchPlayer();
    showNotificationOnLabel(getNextPlayerMessage(currentPlayer));
    delay(generateComputerClick, 1000);
  };

  const drawGridOn = (element) => {
    const { id } = element.parentNode;
    const totalCells = 11 * 11;
    let x = 0;
    let y = 0;
    [...new Array(totalCells)].forEach((_, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (index % 11 === 0) {
        cell.textContent = index > 0 ? index / 11 : '';
        if (index > 0) cell.classList.add('border-right-only', 'labels');
        element.appendChild(cell);
        return;
      }

      if (index < 11) {
        cell.classList.add('border-bottom-only', 'labels');
        cell.textContent = String.fromCharCode(64 + index);
        element.appendChild(cell);
        return;
      }

      const clickHandler = `${id}`.startsWith('computer') ? handleClickMoveByHuman
        : handleClickMoveByComputer;

      cell.addEventListener('click', clickHandler);
      cell.classList.add('border-bottom-only', 'clickable');
      cell.dataset.x = x % 10;
      cell.dataset.y = y % 10;

      x += 1;
      y += x % 10 === 0 ? 1 : 0;
      element.appendChild(cell);
    });
  };

  const init = () => {
    grids = ['computer', 'human']
      .map(selector => document.querySelector(`#${selector}-grid .grid`));
    grids.forEach((grid) => { drawGridOn(grid); });

    ([computerGrid, humanGrid] = grids);

    getComputerShips().forEach(ship => {
      computerBoard.placeShipAt(ship.coordinates);
      ship.coordinates.forEach((coordinate) => {
        const { x, y } = coordinate;
        const cell = computerGrid.querySelectorAll(`[data-x='${x}'][data-y='${y}']`)[0];
        cell.classList.add('ship-location');
      });
    });

    getHumanShips().forEach(ship => {
      humanBoard.placeShipAt(ship.coordinates);
      ship.coordinates.forEach((coordinate) => {
        const { x, y } = coordinate;
        const cell = humanGrid.querySelectorAll(`[data-x='${x}'][data-y='${y}']`)[0];
        cell.classList.add('ship-location');
      });
    });

    showNotificationOnLabel(getNextPlayerMessage(currentPlayer));
  };

  return {
    initialize: init,
  };
})();

document.addEventListener('DOMContentLoaded', game.initialize);