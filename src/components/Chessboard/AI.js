// import Chess from 'chess.js'
import LRU from './lru'

class AI {
  prepareMove(game) {
    let turn = game.turn() === "w" ? "white" : "black";
    if (!game.game_over()) {
      if (turn === "black") {
        // cpu turn
        let mv = getNextMove(4, game);
        console.log("mv: " + mv);
        game.move(mv);
      }
    }
  }
}

export default AI

var reverseArray = function(array) {
  return array.slice().reverse();
};

var pawnEvalWhite =
  [
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
    [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
    [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
    [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
    [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
    [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
  ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
  [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
    [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
    [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
    [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
    [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
    [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
  ];

var bishopEvalWhite = [
  [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
  [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
  [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
  [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
  [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
  [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
  [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
  [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
  [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
  [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen =
  [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
  ];

var kingEvalWhite = [

  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
  [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

// get a numerical score for the cpu (black's) position
function heuristic(game) {
  var black = 0;
  var white = 0;
  const turn = game.turn(); // 'b' or 'w'
  if (turn == 'w') {
    if (game.in_checkmate()) {
      console.log("w checkmate")
      return 10000
    }
  } else {
    if (game.in_checkmate()) {
      console.log("b checkmate")
      return -10000
    }
  }
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var piece = game.board()[i][j];
      if (piece != null) {
        if (piece.color == 'w') {
          white = white + getMaterial(piece, i, j, true);
        } else {
          black = black + getMaterial(piece, i, j, false);
        }
      }
    }
  }
  console.log(white + " " + black);
  return black - white;
}

function getMaterial(piece, x, y, isWhite) {
  switch(piece.type) {
    case 'q':
      return 100 + evalQueen[y][x];
    case 'r':
      return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
    case 'b':
      return 25 + bishopEvalBlack[y][x];
    case 'n':
      return 25 + knightEval[y][x];
    case 'p':
      return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
    case'k':
      return 500 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
    default:
      return 0;
  }
}
const CACHE_SIZE = 10000000000
const scoreCache = new LRU(CACHE_SIZE)  // board fen to heuristic value - prevent recalculation of heuristic?
// root node is our start position

class State {
  constructor(pos, depth, root) {
    this.pos = pos
    this.depth = depth
    this.root = root
  }
}

class searchResult {
  constructor(value, move) {
    this.value = value
    this.move = move
  }
}

function iterativeDeepening(game, depth) {
  var start = Date.now()
  var sResult = null
  let firstGuess = 0
  let d = 1
  while (d < depth) {
    sResult = mtdf(game, firstGuess, d)
    firstGuess = sResult.value
    var delta = Date.now() - start
    if (delta > 5000) break
    // if times_up() break
    d++
  }

  return sResult
}

function mtdf(game, f, depth) {
  var sResult = null
  var value = f
  let beta = 0
  let upperBound = Number.POSITIVE_INFINITY
  let lowerBound = Number.NEGATIVE_INFINITY
  while (lowerBound < upperBound) {
    if (value == lowerBound) {
      beta = value + 1
    } else {
      beta = value
    }
    sResult = alphaBetaLookup(depth, game, beta - 1, beta)
    value = sResult.value
    // console.log(`value: ${value}`)
    // console.log(`mtdf: ${sResult.move}`)
    if (value < beta) {
      upperBound = value
    } else {
      lowerBound = value
    }
  }
  return sResult
}

function alphaBetaLookup(depth, game, alpha=Number.NEGATIVE_INFINITY, beta=Number.POSITIVE_INFINITY, maxPlayer=true, root=true) {
  let curState = new State(game.fen(), depth, root)
  let entry = scoreCache.read(curState)
  if (entry) {
    if (entry.lower >= beta) {
      return new searchResult(entry.lower, entry.move) 
    }
    if (entry.upper <= alpha) {
      return new searchResult(entry.upper, entry.move)
    }
    alpha = Math.max(alpha, entry.lower)
    beta = Math.min(beta, entry.upper)
  } else {
    entry = {
      lower: Number.NEGATIVE_INFINITY,
      upper: Number.POSITIVE_INFINITY
    }
  }
  
  if (depth == 0) {
    var value = heuristic(game)
    return new searchResult(value, null)
  }

  var possibleMoves = game.moves()
  possibleMoves.sort(function(a,b) {
    return 0.5 - Math.random()
  });

  var bestMoveValue = maxPlayer ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  var bestMove = possibleMoves[0] 

  if (maxPlayer) {
    let i = 0
    while ((bestMoveValue < beta) && (i < possibleMoves.length)) {
      let c = possibleMoves[i]
      game.move(c)
      let sResult = alphaBetaLookup(depth - 1, game, alpha, beta, !maxPlayer, false)
      let val = sResult.value
      if (val >= bestMoveValue) {
        bestMoveValue = val
        bestMove = c
      }
      alpha = Math.max(alpha, val)
      game.undo()
      i++
    }
  } else {
    let i = 0
    while ((bestMoveValue > alpha) && (i < possibleMoves.length)) {
      let c = possibleMoves[i]
      game.move(c)
      let sResult = alphaBetaLookup(depth - 1, game, alpha, beta, !maxPlayer, false)
      let val = sResult.value
      if (val <= bestMoveValue) {
        bestMoveValue = val
        bestMove = c
      }
      alpha = Math.min(alpha, val)
      game.undo()
      i++
    }
  }

  if (bestMoveValue <= alpha) {
    entry.upper = bestMoveValue 
  }
  if (bestMoveValue > alpha && bestMoveValue < beta) {
    entry.lower = bestMoveValue
    entry.upper = bestMoveValue
  }
  if (bestMoveValue >= beta) {
    entry.lower = bestMoveValue
  }
  entry.move = bestMove
  scoreCache.write(curState, entry)

  return new searchResult(bestMoveValue, bestMove)
}

function getNextMove(depth, game) {
  return iterativeDeepening(game, depth).move 
}