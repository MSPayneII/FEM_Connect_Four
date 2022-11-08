import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import RedIndicator from "../src/assets/images/marker-red.svg";
import YellowIndicator from "../src/assets/images/marker-yellow.svg";

const AppContext = React.createContext();

const initialState = {
  isGameRulesOpen: false,
  isPauseMenuOpen: false,
  isComputerPlaying: false,
  isRedTurn: true,
  redScore: 0,
  yellowScore: 0,
  timePerMove: 30,
  firstTurnRed: true,
  isAnimationInProgress: false,
  isWinnerDeclared: false,
  isDraw: false,
  pieces: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Game rules
  const openGameRules = () => {
    dispatch({ type: "DISPLAY_GAME_RULES" });
  };

  const closeGameRules = () => {
    dispatch({ type: "CLOSE_GAME_RULES" });
  };
  ///////////////

  // Pause menu
  const openPauseMenu = () => {
    dispatch({ type: "DISPLAY_PAUSE_MENU" });
  };

  const closePauseMenu = () => {
    dispatch({ type: "CLOSE_PAUSE_MENU" });
  };
  ////////////////

  const switchWhoseTurnItIs = () => {
    // Switches turn from red to yellow and vice versa
    dispatch({ type: "TOGGLE_TURN" });
  };

  const createBoardCells = () => {
    // Creates the individual slots for the gameboard
    const divArr = [];
    for (let i = 0; i < 42; i++) {
      const div = document.createElement("div");
      divArr.push(div);
    }
    return divArr;
  };

  const updatePieces = (indexToUpdate, player) => {
    // Updates the pieces state variable
    dispatch({
      type: "UPDATE_PIECES_STATE",
      payload: { indexToUpdate, player },
    });
  };

  const turnAnimationOff = () => {
    // sets the isAnimationProgress state variable to false
    dispatch({ type: "TURN_OFF_ANIMATION" });
  };
  const turnAnimationOn = () => {
    // sets the isAnimationProgress state variable to true
    dispatch({ type: "TURN_ON_ANIMATION" });
  };

  const gamePieceDropAnimation = (gamePiece, pieceDropHeight) => {
    // sets the game piece drop animation
    gamePiece.animate(
      [
        { transform: `translateY(${pieceDropHeight}px)`, offset: 0 },
        { transform: `translateY(0px)`, offset: 0.6 },
        { transform: `translateY(${pieceDropHeight / 30}px)`, offset: 0.8 },
        { transform: `translateY(0px)`, offset: 0.95 },
      ],
      {
        duration: 600,
        easing: "linear",
        iterations: 1,
      }
    );
  };

  const displayWinnerName = () => {
    // returns the appropriate player name in the winner display card
    let name;
    if (state.isRedTurn && state.isComputerPlaying && !state.isDraw) {
      name = "you";
    } else if (state.isRedTurn && !state.isComputerPlaying && !state.isDraw) {
      name = "player 1";
    } else if (!state.isRedTurn && state.isComputerPlaying && !state.isDraw) {
      name = "cpu";
    } else if (!state.isRedTurn && !state.isComputerPlaying && !state.isDraw) {
      name = "player 2";
    } else {
      name = "no one";
    }
    return name;
  };

  const displayWinnerBgColor = () => {
    // returns the appropriate class name needed to display the correct background color for the winner
    let bgColor = "";
    let name = displayWinnerName();

    if (name === "you" || name === "player 1") {
      bgColor = "pink-bg-clr";
    } else if (name === "player 1" || name === "player 2") {
      bgColor = "yellow-bg-clr";
    }
    return bgColor;
  };

  const addWinMarker = (boardCell) => {
    // adds circle indicators on the winning game pieces
    let gameboard = document.querySelector(".gameboard");

    let winMarker = document.createElement("div");
    winMarker.className = "piece-win-marker";
    setTimeout(() => {
      gameboard.children[boardCell].appendChild(winMarker);
    }, 500);
  };

  const didPlayerWin = (player, pieces) => {
    // returns true if there is a winning row of 4 game pieces
    for (let index = 0; index < 42; index++) {
      // check horizontal win starting at index
      if (
        index % 7 < 4 &&
        pieces[index] === player &&
        pieces[index + 1] === player &&
        pieces[index + 2] === player &&
        pieces[index + 3] === player
      ) {
        [index, index + 1, index + 2, index + 3].forEach((boardCell) =>
          addWinMarker(boardCell)
        );

        return true;
      }

      // check vertical win starting at index
      if (
        index < 21 &&
        pieces[index] === player &&
        pieces[index + 7] === player &&
        pieces[index + 14] === player &&
        pieces[index + 21] === player
      ) {
        [index, index + 7, index + 14, index + 21].forEach((boardCell) =>
          addWinMarker(boardCell)
        );
        return true;
      }

      // check diagonal win starting at index
      if (
        index % 7 < 4 &&
        index < 18 &&
        pieces[index] === player &&
        pieces[index + 8] === player &&
        pieces[index + 16] === player &&
        pieces[index + 24] === player
      ) {
        [index, index + 8, index + 16, index + 24].forEach((boardCell) =>
          addWinMarker(boardCell)
        );
        return true;
      }

      // check diagonal win starting at the opposite direction
      if (
        index % 7 >= 3 &&
        index < 21 &&
        pieces[index] === player &&
        pieces[index + 6] === player &&
        pieces[index + 12] === player &&
        pieces[index + 18] === player
      ) {
        [index, index + 6, index + 12, index + 18].forEach((boardCell) =>
          addWinMarker(boardCell)
        );
        return true;
      }
    }

    return false;
  };

  const addPointToScore = (player) => {
    if (player === 1) {
      dispatch({ type: "ADD_POINT_TO_RED" });
    } else if (player === 2) {
      dispatch({ type: "ADD_POINT_TO_YELLOW" });
    }
  };

  const declareWinner = (player) => {
    dispatch({ type: "DECLARE_WINNER" });
    if (player === 1 || player === 2) {
      addPointToScore(player);
    }
  };

  const checkForEndOfGame = (player, pieces) => {
    if (didPlayerWin(player, pieces)) {
      declareWinner(player);
      turnAnimationOn();
    }
    if (!didPlayerWin(player, pieces)) {
      turnAnimationOff();
      switchWhoseTurnItIs();
    }
    if (!pieces.includes(0)) {
      dispatch({ type: "DRAW_GAME" });
      declareWinner(0);
    }
  };

  const otherPlayerIsWinner = (currentPlayer) => {
    // This is for when a player's timer runs out. The other player is awarded the win
    switchWhoseTurnItIs();

    if (currentPlayer === 1) {
      declareWinner(2);
    } else if (currentPlayer === 2) {
      declareWinner(1);
    }
  };

  const startNewGame = () => {
    // This is for when players want to "play again" after a game has concluded
    clearBoardDOM();
    dispatch({
      type: "START_NEW_GAME",
    });
  };

  const clearBoardDOM = () => {
    [...document.querySelectorAll(".game-piece")].forEach((piece) => {
      piece.remove();
    });
    [...document.querySelectorAll(".piece-win-marker")].forEach((marker) => {
      marker.remove();
    });
  };

  const restartGame = () => {
    // This is for when players restart a game
    clearBoardDOM();
    dispatch({
      type: "RESTART_GAME",
    });
    closePauseMenu();
  };

  const removeUnplacedPiece = () => {
    // Removes unplaced player indicators and game pieces at the top of a column
    let previousIndicator = document.querySelector("[data-placed='false']");

    if (previousIndicator) {
      previousIndicator.parentElement.removeChild(previousIndicator);
    }
  };

  const computerOpponent = () => {
    // This sets the "isComputerPlaying" state variable to true. Necessary for player vs cpu games
    dispatch({ type: "COMPUTER_IS_PLAYING" });
  };

  const humanOpponent = () => {
    // This sets the "isComputerPlaying" state variable to false. Necessary for player vs player games
    dispatch({ type: "HUMAN_IS_PLAYING" });
  };

  // Move timer related functions
  const CounterMinusOneSec = () => {
    dispatch({ type: "COUNTDOWN" });
  };
  const resetCounter = () => {
    dispatch({ type: "RESET_COUNTDOWN" });
  };
  ///////////////////////////////////

  const getFirstAvailableRow = (pieces, column) => {
    // returns the first available row in a column
    return pieces.filter((_, index) => index % 7 === column).lastIndexOf(0);
  };

  const mouseOverColumnIndicator = (column) => {
    // This displays the player indicator above a column

    // 1= red 2 = yellow
    let player = state.isRedTurn ? 1 : 2;
    let availableRow = getFirstAvailableRow(state.pieces, column);

    if (availableRow === -1) {
      removeUnplacedPiece();
      return;
    }
    if (state.isWinnerDeclared) {
      return;
    }
    removeUnplacedPiece();

    let gameboard = document.querySelector(".gameboard");
    let boardColumn = gameboard.children[column];
    let indicator = document.createElement("img");
    indicator.className = "column-indicator";
    indicator.dataset.placed = false;
    indicator.src = `${state.isRedTurn ? RedIndicator : YellowIndicator}`;
    indicator.dataset.player = player;
    boardColumn.appendChild(indicator);
  };

  const handlePlayerMove = (e, column) => {
    // handles placing a piece on the board after a player clicks a column with available slots in it
    if (state.isWinnerDeclared) {
      e.preventDefault();
      return;
    }

    let gameboard = document.querySelector(".gameboard");
    let availableRow = getFirstAvailableRow(state.pieces, column);

    if (availableRow === -1) {
      removeUnplacedPiece();
      return;
    }

    let indexToUpdate = availableRow * 7 + column;

    // 1= red 2 = yellow
    let player = state.isRedTurn ? 1 : 2;

    updatePieces(indexToUpdate, player);

    let boardColumn = gameboard.children[indexToUpdate];
    let gamePiece = document.createElement("div");
    gamePiece.className = "game-piece";
    gamePiece.dataset.placed = true;
    gamePiece.dataset.player = player;
    boardColumn.appendChild(gamePiece);

    let unplacedGamePiece = document.querySelector("[data-placed='false']");
    let unplacedY = unplacedGamePiece.getBoundingClientRect().y;
    let placedY = gamePiece.getBoundingClientRect().y;
    let yDiff = unplacedY - placedY;

    turnAnimationOn();
    gamePieceDropAnimation(gamePiece, yDiff);
    resetCounter();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        openGameRules,
        closeGameRules,
        openPauseMenu,
        closePauseMenu,
        createBoardCells,
        switchWhoseTurnItIs,
        turnAnimationOn,
        turnAnimationOff,
        updatePieces,
        gamePieceDropAnimation,
        checkForEndOfGame,
        displayWinnerName,
        declareWinner,
        startNewGame,
        restartGame,
        removeUnplacedPiece,
        computerOpponent,
        humanOpponent,
        CounterMinusOneSec,
        resetCounter,
        getFirstAvailableRow,
        displayWinnerBgColor,
        mouseOverColumnIndicator,
        handlePlayerMove,
        otherPlayerIsWinner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
