import React, { useState, useEffect } from 'react';
import './App.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const win = calculateWinner(squares);
    if (win) {
      setWinner(win);
    }
  }, [squares]);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (winner || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = isXNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setIsXNext(!isXNext);
  };

  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderCelebration = () => {
    if (winner) {
      return <div className="celebration">🎉</div>;
    }
    return null;
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">{status}</div>
      <button className="new-game-button" onClick={handleNewGame}>
        New Game
      </button>
      {renderCelebration()}
    </div>
  );
};

const calculateWinner = (squares) => {
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
};

export default App;
