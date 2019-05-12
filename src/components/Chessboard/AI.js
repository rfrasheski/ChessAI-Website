// import Chess from 'chess.js'
class AI {
  // options = options || {};
  // /// We can load Stockfish via Web Workers or via STOCKFISH() if loaded from a <script> tag.
  // let engine =
  //   typeof STOCKFISH === "function"
  //     ? STOCKFISH()
  //     : new Worker(options.stockfishjs || "stockfish.js");
  // let evaler =
  //   typeof STOCKFISH === "function"
  //     ? STOCKFISH()
  //     : new Worker(options.stockfishjs || "stockfish.js");
  // let engineStatus = {};
  // let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
  // let playerColor = "black";
  // let clockTimeoutID = null;
  // // let isEngineRunning = false;
  // let announced_game_over;
  // do not pick up pieces if the game is over
  // only pick up pieces for White
  // setInterval(function () {
  //   if (announced_game_over) {
  //     return;
  //   }
  //   if (game.game_over()) {
  //     announced_game_over = true;
  //   }
  // }, 500);
  // function uciCmd(cmd, which) {
  //   // console.log('UCI: ' + cmd);
  //   (which || engine).postMessage(cmd);
  // }
  // uciCmd("uci");
  // function clockTick() {
  //   let t =
  //     (time.clockColor === "white" ? time.wtime : time.btime) +
  //     time.startTime -
  //     Date.now();
  //   let timeToNextSecond = (t % 1000) + 1;
  //   clockTimeoutID = setTimeout(clockTick, timeToNextSecond);
  // }
  // function stopClock() {
  //   if (clockTimeoutID !== null) {
  //     clearTimeout(clockTimeoutID);
  //     clockTimeoutID = null;
  //   }
  //   if (time.startTime > 0) {
  //     let elapsed = Date.now() - time.startTime;
  //     time.startTime = null;
  //     if (time.clockColor === "white") {
  //       time.wtime = Math.max(0, time.wtime - elapsed);
  //     } else {
  //       time.btime = Math.max(0, time.btime - elapsed);
  //     }
  //   }
  // }
  // function startClock() {
  //   if (game.turn() === "w") {
  //     time.wtime += time.winc;
  //     time.clockColor = "white";
  //   } else {
  //     time.btime += time.binc;
  //     time.clockColor = "black";
  //   }
  //   time.startTime = Date.now();
  //   clockTick();
  // }
  // function get_moves() {
  //   let moves = "";
  //   let history = game.history({ verbose: true });
  //   for (let i = 0; i < history.length; ++i) {
  //     let move = history[i];
  //     moves +=
  //       " " + move.from + move.to + (move.promotion ? move.promotion : "");
  //   }
  //   return moves;
  // }
  prepareMove(game) {
    // stopClock();
    // this.setState({ fen: game.fen() });
    let turn = game.turn() === "w" ? "white" : "black";
    if (!game.game_over()) {
      if (turn === "black") {
        // cpu turn
        let moves = game.moves();
        let move = moves[Math.floor(Math.random() * moves.length)];
        game.move(move);
      }
      // if (turn !== playerColor) {
      // playerColor = playerColor === 'white' ? 'black' : 'white';
      // uciCmd("position startpos moves" + get_moves());
      // uciCmd("position startpos moves" + get_moves(), evaler);
      // uciCmd("eval", evaler);
      // if (time && time.wtime) {
      //   uciCmd(
      //     "go " +
      //     (time.depth ? "depth " + time.depth : "") +
      //     " wtime " +
      //     time.wtime +
      //     " winc " +
      //     time.winc +
      //     " btime " +
      //     time.btime +
      //     " binc " +
      //     time.binc
      //   );
      // } else {
      //   uciCmd("go " + (time.depth ? "depth " + time.depth : ""));
      // }
      // isEngineRunning = true;
      // }
      // if (game.history().length >= 2 && !time.depth && !time.nodes) {
      //   startClock();
      // }
    }
  }
}

export default AI
