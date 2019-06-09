import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import Board from '../components/Chessboard/'

const PlayPage = () => {
  return (
    <Layout>
      <div>
        <div align="center">
          <br/>
          <h1 style={{color: "cornflowerblue", fontSize: 50, fontWeight: 'bold'}}>
            ChessAI
          </h1>
        </div>
        <Board/>
      </div>
    </Layout>
  )
}

export default PlayPage
