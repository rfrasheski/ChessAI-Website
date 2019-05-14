// import Chess from 'chess.js'
class AI {
  prepareMove(game) {
    let turn = game.turn() === "w" ? "white" : "black";
    if (!game.game_over()) {
      if (turn === "black") {
        // cpu turn
        let moves = game.moves();
        let move = moves[Math.floor(Math.random() * moves.length)];
        game.move(move);
      }
    }
  }
}

export default AI
