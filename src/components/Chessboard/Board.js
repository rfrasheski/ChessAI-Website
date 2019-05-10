import React, { Component } from 'react';
import { connect } from "react-redux";
import Chessboard from 'chessboardjsx';

class Board extends Component {
  render() {
    return(
      <div style={boardsContainer}>
        <Chessboard
          id="standard"
          orientation="black"
          width={500}
          position="start"
          dropOffBoard="trash"
          sparePieces={false}
          lightSquareStyle={{ backgroundColor: "AliceBlue" }}
          darkSquareStyle={{ backgroundColor: "CornFlowerBlue" }}
        />
      )}
      </div>
    )
  }
}

// export default connect(mapStateToProps) (Board);
export default Board;

const boardsContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 30,
  marginBottom: 50
};
