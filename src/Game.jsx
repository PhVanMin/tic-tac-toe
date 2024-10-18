import React, { useState } from "react";
import Board from "./components/Board";

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const winningSquares = winner
    ? calculateWinningSquares(current.squares, winner)
    : null;

  const moves = history.map((step, move) => {
    const desc =
      "You are at move #" + move + ` (${Math.floor(move / 3)}, ${move % 3})`;
    return (
      <li
        key={move}
        onClick={() => {
          setStepNumber(move);
          setXIsNext(move % 2 === 0);
        }}>
        {move !== stepNumber ? <span>{desc}</span> : desc}
      </li>
    );
  });

  const sortedMoves = sortAscending ? moves : moves.slice().reverse();

  const handleRestart = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    setSortAscending(true);
  };

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === 9) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={current.squares}
          onPlay={(nextSquares) => {
            const nextHistory = history
              .slice(0, stepNumber + 1)
              .concat([{ squares: nextSquares }]);
            setHistory(nextHistory);
            setStepNumber(nextHistory.length - 1);
            setXIsNext((state) => !state);
          }}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setSortAscending(!sortAscending)}>
          Toggle Sort Order
        </button>
        <button onClick={handleRestart}>Go to game start (Restart)</button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateWinningSquares(squares, winner) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

export default Game;
