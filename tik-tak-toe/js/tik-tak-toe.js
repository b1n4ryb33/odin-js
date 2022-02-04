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
        _board = Array(9).fill('');
    }

    return {setMarker, getBoard, clearBoard};
})();

const player = (marker) => {
    const _marker = marker;

    const getMarker = () => {
        return _marker;
    }

    const play = () => {
        let cells = Array.from(document.querySelectorAll('.game-board div.cell'));
        return new Promise ((resolve, reject) => {
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

    return {getMarker, play};
}

const game = (players, gameBoard, displayController) => {

    let activePlayer, otherplayer;

    const _setStartPlayer = () => {
        return players[0];
    }

    const _tooglActivePlayer = () => {
        let temp = activePlayer;
        activePlayer = otherplayer;
        otherplayer = temp;
    }

    const _gameOver = (gameBoard, marker) => {
        
        let isGameOver = -1;
        
        if (_isWinningPosition(gameBoard, marker)){
            isGameOver = 1;
        }
        if (!_isWinningPosition(gameBoard, marker) && gameBoard.every(cell => cell != '')){
            isGameOver = 0;
        }

        return isGameOver;
    }

    const _isWinningPosition = (gameBoard, marker) => {
        let combinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        let isGameOver = false;
        combinations.forEach(combination => {
            let isWinningPosition = gameBoard.filter((cell, index) => 
                 combination.some(idx => idx === index)
            ).every(cell => {return cell === marker;});
            if (isWinningPosition){
                let winningCells = [];
                combination.forEach(cell => winningCells.push(document.querySelector(`div.cell[data-index='${cell}']`)));
                console.dir(winningCells);
                displayController.highligthWinningCells(winningCells);
                isGameOver = true;
            }
        });
        return isGameOver;
    }

    const startGame = async () => {
        activePlayer = _setStartPlayer();
        otherplayer = players.find(player => player.getMarker() != activePlayer.getMarker());
        displayController.displayGameBoard(gameBoard.getBoard());

        while (_gameOver(gameBoard.getBoard(), otherplayer.getMarker()) === -1) {
            displayController.displayActivePlayer(activePlayer.getMarker());
            let playersChoice = await activePlayer.play();
            gameBoard.setMarker(activePlayer.getMarker(), playersChoice);
            displayController.displayGameBoard(gameBoard.getBoard());
            _tooglActivePlayer(activePlayer, otherplayer);
        }

        let gameOver = _gameOver(gameBoard.getBoard(), otherplayer.getMarker());

        if(gameOver === 1){
            console.log(`Player with ${otherplayer.getMarker()} won.`);
        }
        if(gameOver === 0){
            console.log('Game drewed.');
        }
       
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
        return [player('X'), player('O')];
    }

    return {play}
})();

// ### View Controller ###
const displayController = ((gameMetaSelector, gameBoardSelector) => {
    const _gameMetaNode = document.querySelector(gameMetaSelector);
    const _gameBoardNode = document.querySelector(gameBoardSelector); 
    
    const displayActivePlayer = (marker) => {
        _gameMetaNode.innerHTML = `<p class="active-player">Player <span class="marker">${marker}</span> turn</p>`;
    }

    const highligthWinningCells = (cells) => {
        cells.forEach(cell => cell.classList.add('highlight-cell'));
    }

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

    return {displayGameBoard, displayActivePlayer, highligthWinningCells};

    // displayStatus
})('section.game-meta', 'section.game-board');

// ### Execution ###
gameController.play();
