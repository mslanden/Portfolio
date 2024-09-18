import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { isValidMove, isInCheck, getRandomMove, pawnPromotion } from '../utils/chessUtils';

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
  const [message, setMessage] = useState('Your turn (White)');
  const [isGameOver, setIsGameOver] = useState(false);
  const [promotionPawn, setPromotionPawn] = useState(null);

  useEffect(() => {
    if (!isWhiteTurn && !isGameOver) {
      setTimeout(makeAIMove, 500);
    }
  }, [isWhiteTurn, isGameOver]);

  const handleCellClick = (row, col) => {
    if (isGameOver || !isWhiteTurn) return;

    if (selectedPiece) {
      const piece = board[selectedPiece.row][selectedPiece.col];
      const isWhitePiece = piece.charCodeAt(0) >= 9812 && piece.charCodeAt(0) <= 9817;

      if (isWhitePiece) {
        if (isValidMove(piece, selectedPiece.row, selectedPiece.col, row, col, board)) {
          const newBoard = board.map(row => [...row]);
          newBoard[row][col] = piece;
          newBoard[selectedPiece.row][selectedPiece.col] = '';

          if (!isInCheck(newBoard, true)) {
            setBoard(newBoard);
            if (piece === '♙' && row === 0) {
              setPromotionPawn({ row, col });
            } else {
              finishTurn(newBoard);
            }
          } else {
            setMessage("Invalid move: King would be in check");
          }
        } else {
          setMessage("Invalid move");
        }
      } else {
        setMessage("It's your turn (White)");
      }
      setSelectedPiece(null);
    } else if (board[row][col] && board[row][col].charCodeAt(0) >= 9812 && board[row][col].charCodeAt(0) <= 9817) {
      setSelectedPiece({ row, col });
    }
  };

  const finishTurn = (newBoard) => {
    setIsWhiteTurn(false);
    setMessage("AI's turn (Black)");
    checkGameState(newBoard, false);
  };

  const makeAIMove = () => {
    const move = getRandomMove(board, false);
    if (move) {
      const { startRow, startCol, endRow, endCol } = move;
      const newBoard = board.map(row => [...row]);
      newBoard[endRow][endCol] = newBoard[startRow][startCol];
      newBoard[startRow][startCol] = '';
      setBoard(newBoard);
      setIsWhiteTurn(true);
      setMessage("Your turn (White)");
      checkGameState(newBoard, true);
    } else {
      setIsGameOver(true);
      setMessage("Game over: Stalemate");
    }
  };

  const checkGameState = (newBoard, isWhiteTurn) => {
    if (isInCheck(newBoard, isWhiteTurn)) {
      const hasValidMove = getRandomMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove) {
        setIsGameOver(true);
        setMessage(`Checkmate! ${isWhiteTurn ? 'Black' : 'White'} wins!`);
      } else {
        setMessage(`${isWhiteTurn ? 'White' : 'Black'} is in check!`);
      }
    } else {
      const hasValidMove = getRandomMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove) {
        setIsGameOver(true);
        setMessage("Game over: Stalemate");
      }
    }
  };

  const handlePromotion = (piece) => {
    if (promotionPawn) {
      const newBoard = board.map(row => [...row]);
      newBoard[promotionPawn.row][promotionPawn.col] = piece;
      setBoard(newBoard);
      setPromotionPawn(null);
      finishTurn(newBoard);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedPiece(null);
    setIsWhiteTurn(true);
    setMessage('Your turn (White)');
    setIsGameOver(false);
    setPromotionPawn(null);
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
      {promotionPawn && (
        <div className="mt-4">
          <p>Choose promotion piece:</p>
          <div className="flex space-x-2">
            {['♕', '♖', '♗', '♘'].map((piece) => (
              <Button key={piece} onClick={() => handlePromotion(piece)}>{piece}</Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessGame;
