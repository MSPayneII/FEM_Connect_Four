const reducer = (state, action) => {
  if (action.type === "DISPLAY_GAME_RULES") {
    return { ...state, isGameRulesOpen: true };
  }

  if (action.type === "CLOSE_GAME_RULES") {
    return { ...state, isGameRulesOpen: false };
  }

  if (action.type === "DISPLAY_PAUSE_MENU") {
    return { ...state, isPauseMenuOpen: true };
  }
  if (action.type === "CLOSE_PAUSE_MENU") {
    return { ...state, isPauseMenuOpen: false };
  }

  if (action.type === "TOGGLE_TURN") {
    return { ...state, isRedTurn: !state.isRedTurn };
  }
  if (action.type === "TURN_OFF_ANIMATION") {
    return { ...state, isAnimationInProgress: false };
  }
  if (action.type === "TURN_ON_ANIMATION") {
    return { ...state, isAnimationInProgress: true };
  }

  if (action.type === "COMPUTER_IS_PLAYING") {
    return {
      ...state,
      isComputerPlaying: true,
    };
  }
  if (action.type === "HUMAN_IS_PLAYING") {
    return {
      ...state,
      isComputerPlaying: false,
    };
  }

  if (action.type === "UPDATE_PIECES_STATE") {
    let index = action.payload.indexToUpdate;
    let newArr = [...state.pieces];
    newArr[index] = action.payload.player;
    return {
      ...state,
      pieces: newArr,
    };
  }
  if (action.type === "DECLARE_WINNER") {
    return {
      ...state,
      isWinnerDeclared: true,
    };
  }

  if (action.type === "DRAW_GAME") {
    return {
      ...state,
      isDraw: true,
    };
  }
  if (action.type === "ADD_POINT_TO_RED") {
    return {
      ...state,
      redScore: state.redScore + 1,
    };
  }
  if (action.type === "ADD_POINT_TO_YELLOW") {
    return {
      ...state,
      yellowScore: state.yellowScore + 1,
    };
  }

  if (action.type === "COUNTDOWN") {
    return {
      ...state,
      timePerMove: state.timePerMove - 1,
    };
  }
  if (action.type === "RESET_COUNTDOWN") {
    return {
      ...state,
      timePerMove: 30,
    };
  }

  if (action.type === "START_NEW_GAME") {
    return {
      ...state,
      firstTurnRed: state.isRedTurn ? false : true,
      // isComputerPlaying: state.isComputerPlaying ? true : false,
      isRedTurn: state.isRedTurn ? true : false,
      isAnimationInProgress: false,
      isWinnerDeclared: false,
      isDraw: false,
      pieces: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    };
  }
  if (action.type === "RESTART_GAME") {
    return {
      isGameRulesOpen: false,
      isPauseMenuOpen: false,
      // isComputerPlaying: state.isComputerPlaying ? true : false,
      isRedTurn: state.isRedTurn ? true : false,
      redScore: 0,
      yellowScore: 0,
      firstTurnRed: state.isRedTurn ? false : true,
      isAnimationInProgress: false,
      isWinnerDeclared: false,
      isDraw: false,
      pieces: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    };
  }
  throw new Error("no matching action type");
};

export default reducer;
