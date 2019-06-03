import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
// import { Link } from "gatsby"
import Poster from '../images/ChessAI.pdf'
import Mascot from '../images/ChessMascot.png'
import Board from '../components/Chessboard/'

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <div align="center">
        <br/>
          <h1 style={{color: "cornflowerblue", fontSize: 50, fontWeight: 'bold'}}>
            ChessAI
          </h1>
          <img src={Mascot} alt="mascot"/>
          <h2>A Game Of Skill</h2>
          <h3>Ryan Frasheski + Shang Yang</h3>
          <h4>frashesk@seattleu.edu  |  yangs8@seattleu.edu</h4>
          <br/>
          <embed style={{marginLeft: 0}} src={Poster} width="600" height="700" alt="pdf" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html" type="application/pdf"></embed>
          <br/>
          {/*}<Link to="">
            <Button type="primary" size="large" style={{marginRight: 10}}>Play</Button>
          </Link>*/}
          <Button type="primary" size="large" href="https://github.com/rfrasheski/ChessAI">Github</Button>
        </div>
          <Board/>
        <div align="center">
        <br/>
        <br/>
          <h2>Project Goals</h2>
          <h4>
            The goal of this project is to create a chess playing AI to take on
            the greatest chess grandmasters in the world. By incorporating the
            topics learned in our AI course, we will bestow upon it the power to
            crush its opponents mercilessly and effortlessly.
            ChessAI will be made in Javascript and playable on this page.
          </h4>
          <br/>
          <h2>Libraries and References</h2>
          <a href="https://chessboardjsx.com/">Chessboardjsx - Web GUI</a>
          <br/>
          <a href="https://github.com/jhlywa/chess.js/blob/master/README.md">Chess.js - Game Logic</a>
          <br/>
          <br/>
          <h4>
            These libraries will provide the gameplay framework and GUI components that
            our own AI systems can use to interact with players and understand
            game state.
          </h4>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
