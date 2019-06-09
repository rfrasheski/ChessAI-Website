import LRU from './LRU'
const SEARCH_DEPTH = 4;

class AI {
  prepareMove(game) {
    let turn = game.turn() === "w" ? "white" : "black";
    if (!game.game_over()) {
      if (turn === "black") {
        // ensure it is cpu turn
        let mv = getNextMove(game, SEARCH_DEPTH);
        console.log("mv: " + mv);
        game.move(mv);
      }
    }
  }
}

export default AI

// get a numerical score for the cpu (black's) position
function heuristic(game) {
  const turn = game.turn(); // 'b' or 'w'
  if (turn == 'w') {
    if (game.in_checkmate()) {
      return 10000
    }
  } else {
    if (game.in_checkmate()) {
      return -10000
    }
  }
  const { materialWhite, materialBlack } = getMaterial(game) // numerical values
  console.log(materialWhite + " " + materialBlack)
  return materialBlack - materialWhite
}

function getMaterial(board) {
  let fen = board.fen()
  let black = 0
  let white = 0;
  outerloop:
  for (const char of fen) {
    switch(char) {
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

const CACHE_SIZE = 1000000
const scoreCache = new LRU(CACHE_SIZE)  // State -> { lower, upper, move }

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

function getNextMove(game, depth) {
  return iterativeDeepening(game, depth).move 
}