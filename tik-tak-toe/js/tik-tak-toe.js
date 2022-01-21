// ### Game Logic - Model ###

const gameBoard = (() => {
    'use strict';

    let _board = ['','','','','','','','',''];

    // private methods
    const _coordinateToIndex = (coordinate) => {
        switch(coordinate){
            case [0,0]:
                return 0;
            case [0,1]:
                return 1;
            case [0,2]:
                return 2;
            case [1,0]:
                return 3;
            case [1,1]:
                return 4;
            case [1,2]:
                return 5;
            case [2,0]:
                return 6;
            case [2,1]:
                return 7;
            case [2,2]:
                return 8;
            default:
                throw new Error('Coordinate not in Range[0..2, 0..2].');
        }
    }

    const _positionIsFree = (index) => {
        return _board[index] ? true : false;
    }

    // public methods
    const setMarker = (marker, coordinate) => {
        let index;
        
        try { 
            index = _coordinateToIndex(coordinate);
        } 
        catch(e) {
            console.log(`[Error]: ${e.message}`);
            // Spiel sollte beendet werden
        }

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
}

// ### Controller ###
const displayController = ((gameMetaSelector, gameBoardSelector) => {
    const _gameMetaNode = document.querySelector(gameMetaSelector);
    const _gameBoardNode = document.querySelector(gameBoardSelector); 
    
    const displayGameBoard = (gameBoard) => {
        // was ist mit sortierung?
        // was ist wenn das Gameboard nicht 9 groß ist?

        _clearBoard();

        gameBoard.forEach(entry => {
            _addCellNode(entry);
        });
    }

    const _addCellNode = (entry) => {
        const template = `<div class="cell" data-value="${entry}">${entry}</div>`;
        _gameBoardNode.innerHTML += template;
    }

    const _clearBoard = () => {
        _gameBoardNode.innerHTML = '';
    }

    return {displayGameBoard};

    // displayStatus
})('section.game-meta', 'section.game-board');

// ### Execution ###

displayController.displayGameBoard(gameBoard.getBoard());

// Koordinaten rausstreichen. Statdessen dem template n Index mitgeben und diesen nehmen.