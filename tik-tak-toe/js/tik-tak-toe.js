// ### Game Logic - Model ###
const board = (board = Array(9).fill('')) => {

    let _board = board.slice();
    let _winningCells = [];

    const _setWinningCells = (combination) => {
        _winningCells = combination;
    }

    const _isWinningPosition = (marker) => {
        const combinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        let isGameOver = false;
        combinations.forEach(combination => {
            let isWinningPosition = _board.filter((cell, index) => 
                 combination.some(idx => idx === index)
            ).every(cell => {return cell === marker;});
            if (isWinningPosition){
                _setWinningCells(combination);
                isGameOver = true;
            }
        });
        return isGameOver;
    }

    const _positionIsFree = (index) => {
        return _board[index] === '';
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

    const gameOver = (marker) => {
        
        let isGameOver = -1;
        const isWinningPosition = _isWinningPosition(marker);
        if (isWinningPosition){
            isGameOver = 1;
        }
        if (!isWinningPosition && _board.every(cell => cell != '')){
            isGameOver = 0;
        }

        return isGameOver;
    }

    const getWinningCells = () => {
        return _winningCells;
    }

    return {setMarker, getBoard, clearBoard, getWinningCells, gameOver};
}

const boardFactory = () => {

    const _positionIsFree = (board, index) => {
        return board[index] === '';
    }

    const _getFreePositions = (board) => {
        let freePositions = [];
        board.forEach((cell, idx) => {
            _positionIsFree(board, idx) ? freePositions.push(idx) : null;
        });
        return freePositions;
    }

    const getNextMoves = (marker, currentBoard) => {
        let freePositions = _getFreePositions(currentBoard);
        let nextMoves = [];
        freePositions.forEach(freePosition => {
            let newPosition = board(currentBoard);
            newPosition.setMarker(marker, freePosition);
            nextMoves.push([newPosition, freePosition]);
        });
        return nextMoves;
    }

    return {getNextMoves};
}

const player = (marker) => {
    const _marker = marker;
    let _winnings = 0;

    const getMarker = () => {
        return _marker;
    }

    const won = () => {
        _winnings++;
    }

    const getWinnigns = () => {
        return _winnings;
    }

    return {getMarker, won, getWinnigns};
}

const humanPlayer = (marker) => {
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

    return Object.assign({}, {play}, player(marker));
}

const easyAi = (marker) => {

    const _getFreePositions = () => {
        let freePositions = [];
        gameBoard.getBoard().forEach((cell, idx) =>{
            if(cell === '') {
                freePositions.push(idx);
            }
        });
        return freePositions;
    }

    const play = () => {
        const freePositions = _getFreePositions();
        console.dir(freePositions);
        const playersChoice = freePositions[Math.floor(Math.random() * freePositions.length)];
        return new Promise ((resolve, reject) => {
            setTimeout(() => {resolve(playersChoice);}, 1200);
        });
    }


    return Object.assign({}, {play}, player(marker));
}

const hardAi = (marker) => {

    const _miniMax = (board, isMaximizingPlayer = false) => {
        const isGameOver = board.gameOver(marker);
        if(isGameOver === 0 || (isGameOver === 1 && isMaximizingPlayer)){
            return isGameOver;
        }
        if( isGameOver === 1 && !isMaximizingPlayer){
            return -1;
        }
        let boardCreator = boardFactory();
        let nextMoves = boardCreator.getNextMoves(marker, board.getBoard());

        if(isMaximizingPlayer){
            let maxEval = -Infinity;
            nextMoves.forEach(move => {
                let evaluation = _miniMax(move[0], false);
                maxEval = maxEval > evaluation ? maxEval : evaluation; 
            });
            return maxEval;
        }
        else {
            let minEval = +Infinity;
            nextMoves.forEach(move => {
                let evaluation = _miniMax(move[0], true);
                minEval = minEval < evaluation ? minEval : evaluation; 
            });
            return minEval;
        }
    }

    const _findBestMove = (board) => {
        let bestMove = null;
        let bestScore = -1;
        let boardCreator = boardFactory();
        let nextMoves = boardCreator.getNextMoves(marker, board.getBoard());
        nextMoves.forEach(move => {
            let moveScore = _miniMax(move[0]);
            if(moveScore > bestScore){
                bestMove = move[1];
                bestScore = moveScore;
            }
        });
        return bestMove;
    }

    const play = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {resolve(_findBestMove(gameBoard));}, 1200);
        });
    }

    return Object.assign({}, {play}, player(marker));
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

    const startGame = async () => {
        gameBoard.clearBoard();
        activePlayer = _setStartPlayer();
        otherplayer = players.find(player => player.getMarker() != activePlayer.getMarker());
        gameController.displayGameBoard(gameBoard.getBoard());
        gameController.displayPlayersInfo(players);

        while (gameBoard.gameOver(otherplayer.getMarker()) === -1) {
            gameController.displayActivePlayer(activePlayer.getMarker());
            let playersChoice = await activePlayer.play();
            gameBoard.setMarker(activePlayer.getMarker(), playersChoice);
            gameController.displayGameBoard(gameBoard.getBoard());
            _tooglActivePlayer(activePlayer, otherplayer);
        }

        let gameOver = gameBoard.gameOver(otherplayer.getMarker());

        if(gameOver === 1){
            gameController.highligthWinningCells(gameBoard.getWinningCells());
            console.log(`Player with ${otherplayer.getMarker()} won.`);
            otherplayer.won();
        }
        if(gameOver === 0){
            console.log('Game drewed.');
        }
        gameController.displayPlayersInfo(players);
       
    }

    return {startGame}
}

const gameBoard = (() => {
    return board();
})();

const gameManager = (() => {

    let games = [];
    let players = [];

    let play = () => {
        let newGame = game(players, gameBoard, gameController);
        newGame.startGame();
        games.push(newGame);
    }

    let setPlayers = (playerOne, playerTwo) => {
        players = [humanPlayer('X'), hardAi('O')];
        console.dir(players);
    }

    return {play, setPlayers}
})();

// ### View Controller ###
const gameController = ((gameMetaSelector, gameBoardSelector) => {
    const _gameMetaNode = document.querySelector(gameMetaSelector);
    const _gameBoardNode = document.querySelector(gameBoardSelector); 
    
    const displayActivePlayer = (marker) => {
        _gameMetaNode.querySelector('div.active-player').innerHTML = `<p class="active-player">Player <span class="marker">${marker}</span> turn</p>`;
    }

    const highligthWinningCells = (winningCells) => {
        let winningCellsNodes = [];
        winningCells.forEach(cell => winningCellsNodes.push(document.querySelector(`div.cell[data-index='${cell}']`)));
        winningCellsNodes.forEach(cell => cell.classList.add('highlight-cell'));
    }

    const displayGameBoard = (gameBoard) => {
        // was ist mit sortierung?
        // was ist wenn das Gameboard nicht 9 groß ist?

        _clearBoard();

        gameBoard.forEach((entry, index) => {
            _addCellNode(entry, index);
        });
    }

    const displayPlayersInfo = (players) => {
        _gameMetaNode.querySelector('div.players-info').innerHTML = '';
        players.forEach(player => _displayPlayerInfo(player));
    }

    const _displayPlayerInfo = (player) => {
        const template = `<ul class="player-info"><li>Player ${player.getMarker()}</li><li>Score: ${player.getWinnigns()}</li></ul>`;
        _gameMetaNode.querySelector('div.players-info').innerHTML += template;
    }

    const _addCellNode = (entry, index) => {
        const template = `<div class="cell" data-value="${entry}" data-index="${index}">${entry}</div>`;
        _gameBoardNode.innerHTML += template;
    }

    const _clearBoard = () => {
        _gameBoardNode.innerHTML = '';
    }

    return {displayGameBoard, displayActivePlayer, highligthWinningCells, displayPlayersInfo};

    // displayStatus
})('section.game-meta', 'section.game-board');

const displayController = ((gameManager, playerSelectionSelector, gameSelector) => {
    const _playerSelectionNode = document.querySelector(playerSelectionSelector);
    const _gameNode = document.querySelector(gameSelector); 

    const _hideNode = (node) => {
        node.style.display = 'none';
    }

    const _showNode = (node, value) => {
        node.style.display = value;
    }

    const _addStartNewGameListener = (startButton, playerOneSelection, playerTwoSelection) => {
        const _playerOneSelection = document.querySelector(`input[name=${playerOneSelection}]:checked`).value;
        const _playerTwoSelection = document.querySelector(`input[name=${playerTwoSelection}]:checked`).value;
        const _startButton = document.querySelector(startButton);

        _startButton.addEventListener('click', () => {
            _hideNode(_playerSelectionNode);
            _showNode(_gameNode, 'block');
            gameManager.setPlayers(_playerOneSelection, _playerTwoSelection);
            gameManager.play();
        });
    }

    const _addReplayEventListener = (replayButton) => {
        document.querySelector(replayButton).addEventListener('click', () => {
            gameManager.play();
        });
    }

    const _addChangePlayerEventListener = (changePlayerButton) => {
        document.querySelector(changePlayerButton).addEventListener('click', () => {
            _hideNode(_gameNode);
            _showNode(_playerSelectionNode, 'grid');
        });
    }

    const init = () => {
        _addStartNewGameListener('#start-new-game-btn', 'player-one-selection', 'player-two-selection');
        _addReplayEventListener('#replay-game-btn');
        _addChangePlayerEventListener('#change-players-btn');
    }

    return {init};
})(gameManager, 'section.player-selection-screen', 'section.game-screen');

// ### Execution ###
displayController.init();