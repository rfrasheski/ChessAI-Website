// import Chess from 'chess.js'
class AI {
  prepareMove(game) {
    let turn = game.turn() === "w" ? "white" : "black";
    if (!game.game_over()) {
      if (turn === "black") {
        // cpu turn
        let mv = calcBestMoveOne(game)
        console.log("mv: " + mv)
        game.move(mv)
      }
    }
  }
}

export default AI

// get a numerical score for the cpu (black's) position
function heuristic(board) {
  const turn = board.turn(); // 'b' or 'w'
  const { materialWhite, materialBlack } = getMaterial(board) // numerical values
  console.log(materialWhite + " " + materialBlack)
  if (turn == 'w') {
    return materialWhite - materialBlack
  } else {
    return materialBlack - materialWhite
  }
}

var calcBestMoveOne = function(game) {
  // List all possible moves
  var possibleMoves = game.moves();
  console.log(possibleMoves)
  // Sort moves randomly, so the same move isn't always picked on ties
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});

  // exit if the game is over
  if (game.game_over() === true || possibleMoves.length === 0) return;

  // Search for move with highest value
  var bestMoveSoFar = null;
  var bestMoveValue = Number.NEGATIVE_INFINITY;
  possibleMoves.forEach(function(move) {
    game.move(move);
    var moveValue = heuristic(game);
    if (moveValue > bestMoveValue) {
      bestMoveSoFar = move;
      bestMoveValue = moveValue;
    }
    game.undo();
  });
  console.log(bestMoveValue)
  console.log(bestMoveSoFar)
  return bestMoveSoFar;
}

function getMaterial(board) {
  let fen = board.fen()
  let black = 0
  let white = 0;
  outerloop:
  for (const char of fen) {
    switch(char) {
      case 'k':
        black += 10000
        break;
      case 'K':
        white += 10000
        break;
      case 'q':
        black += 25
        break;
      case 'Q':
        white += 25
        break;
      case 'r':
        black += 15
        break;
      case 'R':
        white += 15
        break;
      case 'b':
        black += 8
        break;
      case 'B':
        white += 8
        break;
      case 'n':
        black += 8
        break;
      case 'N':
        white += 8
        break;
      case 'p':
        black += 1
        break;
      case 'P':
        white += 1
        break;
      case ' ':
        break outerloop;
      default:
        break;
    }
  }
  return {
    materialWhite: white,
    materialBlack: black
  }
}