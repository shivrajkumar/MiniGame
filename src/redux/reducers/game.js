const intialState = {
  gameLevel: 1,
  score: 0
};

export default (state = intialState, action) => {
  switch (action.type) {
    case "NEXT_LEVEL":
      return {
        ...state,
        gameLevel: action.payload
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: state.score + action.payload
      };
    case "RESET_GAME":
      return intialState;
    default:
      return state;
  }
};
