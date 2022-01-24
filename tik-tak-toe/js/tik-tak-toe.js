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

const game = () => {
    let _round = 0;
// gameOver kommt ins Game Objekt

    let _applyHandlers = () => {
        let cells = Array.from(document.querySelectorAll('.game-board div.cell'));
        cells.forEach(cell => cell.addEventListener('click', setMarker.bind(null, e)));
    }

    let setMarker = (e) => {
        // currentplayer ->
        // zelle aus event bestimmen

    }
}

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

// ### Execution ###

gameBoard.setMarker("x", 1);
gameBoard.setMarker("o", 4);
gameBoard.setMarker("x", 7);
displayController.displayGameBoard(gameBoard.getBoard());
