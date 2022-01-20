// ### Game Logic - Model ###

// gameBoard Modul
const gameBoard = (() => {
    'use strict';

    let _board = [];

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
        _board = [];
    }

    return {setMarker, getBoard, clearBoard};
})();


// gameOver kommt ins Game Objekt