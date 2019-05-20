// import Chess from 'chess.js'
class AI {
  prepareMove(game) {
    let turn = game.turn() === "w" ? "white" : "black";
    if (!game.game_over()) {
      if (turn === "black") {
        // cpu turn
        //let mv = calcBestMoveOne(game)
        let mv = calcBestMove(2, game)[1];
        console.log("mv: " + mv);
        game.move(mv);
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
  if (turn === 'w') {
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

var calcBestMove = function(depth, game,
                            alpha=Number.NEGATIVE_INFINITY,
                            beta=Number.POSITIVE_INFINITY,
                            isMaximizingPlayer=true) {
  // Base case: evaluate board
  if (depth === 0) {
    //value = evaluateBoard(game.board(), playerColor);
    var value = heuristic(game);
    return [value, null];
  }

  // Recursive case: search possible moves
  var bestMove = null; // best move not set yet
  var possibleMoves = game.moves();
  // Set random order for possible moves
  possibleMoves.sort(function(a, b) {
    return 0.5 - Math.random()
  });
  // Set a default best move value
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
    : Number.POSITIVE_INFINITY;
  // Search through all possible moves
  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    // Make the move, but undo before exiting loop
    game.move(move);
    // Recursively get the value from this move
    value = calcBestMove(depth - 1, game, alpha, beta, !isMaximizingPlayer)[0];
    // Log the value of this move
    console.log(isMaximizingPlayer ? 'Max: ' : 'Min: ', depth, move, value,
      bestMove, bestMoveValue);

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
    } else {
      // Look for moves that minimize position
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      beta = Math.min(beta, value);
    }
    // Undo previous move
    game.undo();
    // Check for alpha beta pruning
    if (beta <= alpha) {
      console.log('Prune', alpha, beta);
      break;
    }
  }
  // Log the best move at the current depth
  console.log('Depth: ' + depth + ' | Best Move: ' + bestMove + ' | ' + bestMoveValue + ' | A: ' + alpha + ' | B: ' + beta);
  // Return the best move, or the only move
  return [bestMoveValue, bestMove || possibleMoves[0]];
}