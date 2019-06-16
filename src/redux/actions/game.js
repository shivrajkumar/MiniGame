export function changeLevel(level) {
  return {
    type: "NEXT_LEVEL",
    payload: level
  };
}

export function updateScore(score) {
  return {
    type: "UPDATE_SCORE",
    payload: score
  };
}

export function resetGame() {
  return {
    type: "RESET_GAME"
  };
}
