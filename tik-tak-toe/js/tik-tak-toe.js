// ### Game Logic - Model ###

const gameBoard = (() => {
    'use strict';

    let _board = ['','','','','','','','',''];

    const _positionIsFree = (index) => {
        return _board[index] != 'o' && _board[index] != 'x';
    }

    const setMarker = (marker, index) => {
        if(!_positionIsFree(index)){
           return false;
        }

        _board[index] = marker;
        return true;
    }

    const getBoard = () => {
        return _board;
    }

    const clearBoard = () => {
        _board = ['','','','','','','','',''];
    }

    return {setMarker, getBoard, clearBoard};
})();

const player = (name, marker) => {
    const _name = name;
    const _marker = marker;

    const getName = () => {
        return _name;
    }

    const getMarker = () => {
        return _marker;
    }

    return {getName, getMarker};
}

const game = (players, gameBoard, displayController) => {

    let _round = 0;

    let activePlayer, otherplayer;

    let _applyHandlers = () => {
        let cells = Array.from(document.querySelectorAll('.game-board div.cell'));
        cells.forEach(cell => cell.addEventListener('click', _setMarker.bind(null, e)));
    }

    let _setMarker = (e) => {
        // currentplayer ->
        // zelle aus event bestimmen
    }

    let _setStartPlayer = () => {
        return players[getRandomInt(1)];
    }

    let _gameOver = () => {
        return false;
    } 

    let _tooglActivePlayer = () => {
        let temp = activePlayer;
        activePlayer = otherplayer;
        otherplayer = temp;
    }

    let startNewGame = () => {
        activePlayer = _setStartPlayer();
        // kann auf die fresse fliegen, sofern mehr als zwei player da sind
        otherplayer = players.find(player => player.name != activePlayer.name);
        
        while(!_gameOver) {
            _applyHandlers();
            activePlayer.play();
            displayController.displayGameBoard(gameBoard);
            _tooglActivePlayer();
        }

        // calculate winner
    }

    return {startNewGame}
}

const gameController = (() => {

    let games, players = [], [];

    let play = () => {
        players = _setPlayer();
        let newGame = game(players, gameBoard, displayController);
        newGame.startNewGame();
        games.push(newGame);
    }

    let _setPlayer = () => {
        // entweder existierende Spieler
        // neue Spieler (human oder computer)
    }

    return {play}
})();

// ### Controller ###
const displayController = ((gameMetaSelector, gameBoardSelector) => {
    const _gameMetaNode = document.querySelector(gameMetaSelector);
    const _gameBoardNode = document.querySelector(gameBoardSelector); 
    
    const displayGameBoard = (gameBoard) => {
        // was ist mit sortierung?
        // was ist wenn das Gameboard nicht 9 groß ist?

        _clearBoard();

        gameBoard.forEach((entry, index) => {
            _addCellNode(entry, index);
        });
    }

    const _addCellNode = (entry, index) => {
        const template = `<div class="cell" data-value="${entry}" data-index="${index}">${entry}</div>`;
        _gameBoardNode.innerHTML += template;
    }

    const _clearBoard = () => {
        _gameBoardNode.innerHTML = '';
    }

    return {displayGameBoard};

    // displayStatus
})('section.game-meta', 'section.game-board');

// ### Helper Functions ###
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// ### Execution ###
while (true) {
    gameController.play();
}
