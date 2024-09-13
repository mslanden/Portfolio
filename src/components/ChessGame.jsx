import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { isValidMove, isOpponentPiece, isInCheck } from '../utils/chessUtils';

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
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [message, setMessage] = useState('White to move');

  useEffect(() => {
    if (isInCheck(board, isWhiteTurn)) {
      setMessage(`${isWhiteTurn ? 'White' : 'Black'} is in check!`);
    } else {
      setMessage(`${isWhiteTurn ? 'White' : 'Black'} to move`);
    }
  }, [board, isWhiteTurn]);

  const handleCellClick = (row, col) => {
    if (selectedPiece) {
      const piece = board[selectedPiece.row][selectedPiece.col];
      const isWhitePiece = piece.charCodeAt(0) >= 9812 && piece.charCodeAt(0) <= 9817;

      if ((isWhiteTurn && isWhitePiece) || (!isWhiteTurn && !isWhitePiece)) {
        if (isValidMove(piece, selectedPiece.row, selectedPiece.col, row, col, board)) {
          const newBoard = [...board];
          newBoard[row][col] = piece;
          newBoard[selectedPiece.row][selectedPiece.col] = '';

          if (!isInCheck(newBoard, !isWhiteTurn)) {
            setBoard(newBoard);
            setIsWhiteTurn(!isWhiteTurn);
          } else {
            setMessage("Invalid move: King would be in check");
          }
        } else {
          setMessage("Invalid move");
        }
      } else {
        setMessage("It's not your turn");
      }
      setSelectedPiece(null);
    } else if (board[row][col]) {
      setSelectedPiece({ row, col });
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedPiece(null);
    setIsWhiteTurn(true);
    setMessage('White to move');
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
      <p className="mb-4">{message}</p>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
};

export default ChessGame;