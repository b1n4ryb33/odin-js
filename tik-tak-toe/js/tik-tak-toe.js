// ### Game Logic - Model ###

const gameBoard = (() => {
    'use strict';

    let _board = Array(9).fill('');

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

    const play = () => {
        
        return new Promise ((resolve, reject) => {

            let cells = Array.from(document.querySelectorAll('.game-board div.cell'));
            cells.forEach(cell => {
                if (cell.dataset.value != ''){
                    return;
                }
                cell.addEventListener('click',  () => {
                    resolve(cell.dataset.index);
                });
            }); 
        });
    }

    return {getName, getMarker, play};
}

const game = (players, gameBoard, displayController) => {

    let _round = 0;

    let activePlayer, otherplayer;

    const _setStartPlayer = () => {
        return players[0];
    }

    const _tooglActivePlayer = () => {
        let temp = activePlayer;
        activePlayer = otherplayer;
        otherplayer = temp;
    }

    const _gameOver = () => {
        return false;
    } 

    const startGame = async () => {
        activePlayer = _setStartPlayer();
        otherplayer = players.find(player => player.getName() != activePlayer.getName());
        displayController.displayGameBoard(gameBoard.getBoard());

          for (let i = 0; i < 9; i++) {
            let playersChoice = await activePlayer.play();
            gameBoard.setMarker(activePlayer.getMarker(), playersChoice);
            displayController.displayGameBoard(gameBoard.getBoard());
            _tooglActivePlayer(activePlayer, otherplayer);
         }

        // calculate winner
    }

    return {startGame}
}

const gameController = (() => {

    let games = [];
    let players = [];

    let play = () => {
        players = _setPlayer();
        let newGame = game(players, gameBoard, displayController);
        newGame.startGame();
        games.push(newGame);
    }

    let _setPlayer = () => {
        // entweder existierende Spieler
        // neue Spieler (human oder computer)
        // erstmal nur prototypisch
        return [player('player one', 'x'), player('player two', 'o')];
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


// ### Execution ###

gameController.play();

