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

const game = (players, gameBoard, gameController) => {

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
                gameController.highligthWinningCells(winningCells);
                isGameOver = true;
            }
        });
        return isGameOver;
    }

    const startGame = async () => {
        activePlayer = _setStartPlayer();
        otherplayer = players.find(player => player.getMarker() != activePlayer.getMarker());
        gameController.displayGameBoard(gameBoard.getBoard());

        while (_gameOver(gameBoard.getBoard(), otherplayer.getMarker()) === -1) {
            gameController.displayActivePlayer(activePlayer.getMarker());
            let playersChoice = await activePlayer.play();
            gameBoard.setMarker(activePlayer.getMarker(), playersChoice);
            gameController.displayGameBoard(gameBoard.getBoard());
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

const gameManager = (() => {

    let games = [];
    let players = [];

    let play = (playerOne, playerTwo) => {
        players = _setPlayer();
        let newGame = game(players, gameBoard, gameController);
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
const gameController = ((gameMetaSelector, gameBoardSelector) => {
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

const displayController = ((gameManager, playerSelectionSelector, gameSelector) => {
    const _playerSelectionNode = document.querySelector(playerSelectionSelector);
    const _gameNode = document.querySelector(gameSelector); 

    // wechseln zwischen den Screens
    const _hideNode = (node) => {
        node.style.display = 'none';
    }

    const _showNode = (node, value) => {
        node.style.display = value;
    }

    // radio Buttons
    const _addStartNewSessionListener = (startButton, playerOneSelection, playerTwoSelection) => {
        const _playerOneSelection = document.querySelector(`input[name=${playerOneSelection}]:checked`).value;
        const _playerTwoSelection = document.querySelector(`input[name=${playerTwoSelection}]:checked`).value;
        const _startButton = document.querySelector(startButton);

        _startButton.addEventListener('click', () => {
            _hideNode(_playerSelectionNode);
            _showNode(_gameNode, 'block');
            gameManager.play(_playerOneSelection, _playerTwoSelection);
        });
    }

    const init = () => {
        _addStartNewSessionListener('#start-new-session-btn', 'player-one-selection', 'player-two-selection');
    }

    return {init};
})(gameManager, 'section.player-selection-screen', 'section.game-screen');

// ### Execution ###
// gameManager.play();
displayController.init();
