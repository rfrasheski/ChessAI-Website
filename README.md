# ChessAI

[chessai.ryanfrasheski.com](https://chessai.ryanfrasheski.com/)

The goal of this project is to create a chess playing AI to take on the greatest chess grandmasters in the world. By incorporating the topics learned in our AI course, we will bestow upon it the power to crush its opponents mercilessly and effortlessly. ChessAI is made in Javascript and playable on [chessai.ryanfrasheski.com](https://chessai.ryanfrasheski.com/)

This site is made with the React + Gatsby frameworks in NodeJS.

# Usage

NPM, Node 10+, and [Gatsby](https://www.gatsbyjs.org/docs/quick-start/) required.

```bash
npm install
```

```bash
npm install -g gatsby-cli
```

To run the site locally use:

```bash
gatsby develop
```

The site will be accessible on your local machine at https://localhost:8000

# AI

All relevant Chess and AI code is in src/components/Chessboard

AI.js contains all move search logic and algorithms.

Game.js is a wrapper class to combine the AI algorithm with the [Chessboardjsx](https://chessboardjsx.com/) GUI.

The AI algorithms used are [MTDF](https://people.csail.mit.edu/plaat/mtdf.html), iterative deepening, Alpha Beta Pruning with LRU cache lookup, and board position heuristics. 

[chess.js](https://github.com/jhlywa/chess.js/) is a library that performs move validation, generation, and general game logic. There are a few light modifications made such as making it compatible with React's JSX export format.