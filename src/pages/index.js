import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { Link } from "gatsby"
import Mascot from '../images/ChessMascot.png'

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
          <Link to="">
            <Button type="primary" size="large" style={{marginRight: 10}}>Play</Button>
          </Link>
          <Button type="primary" size="large" href="https://github.com/rfrasheski/ChessAI">Github</Button>
        </div>
        <div align="center">

        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
