import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const ChessGame = () => {
  const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleCellClick = (row, col) => {
    if (selectedPiece) {
      const newBoard = [...board];
      newBoard[row][col] = board[selectedPiece.row][selectedPiece.col];
      newBoard[selectedPiece.row][selectedPiece.col] = '';
      setBoard(newBoard);
      setSelectedPiece(null);
    } else if (board[row][col]) {
      setSelectedPiece({ row, col });
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedPiece(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 gap-1 mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-10 flex items-center justify-center text-2xl cursor-pointer ${
                (rowIndex + colIndex) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-600'
              } ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'bg-yellow-300' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
};

export default ChessGame;