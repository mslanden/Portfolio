import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { isValidMove, isInCheck, getBestMove, pawnPromotion } from '../utils/chessUtils';

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
    const move = getBestMove(board, false);
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
      const hasValidMove = getBestMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove) {
        setIsGameOver(true);
        setMessage(`Checkmate! ${isWhiteTurn ? 'Black' : 'White'} wins!`);
      } else {
        setMessage(`${isWhiteTurn ? 'White' : 'Black'} is in check!`);
      }
    } else {
      const hasValidMove = getBestMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove) {
        setIsGameOver(true);
        setMessage("Game over: Stalemate");
      }
    }
  };

  const handlePromotion = (piece) => {
    if (promotionPawn) {
      const newBoard = pawnPromotion(board, promotionPawn.row, promotionPawn.col, piece);
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
    <div className="flex flex-col items-center bg-gray-900 p-8 rounded-lg shadow-2xl">
      <div className="grid grid-cols-8 gap-1 mb-4 bg-gray-800 p-4 rounded-lg shadow-inner">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 ${
                (rowIndex + colIndex) % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'
              } ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'bg-blue-500 bg-opacity-50 shadow-lg' : ''}
              hover:bg-opacity-80 hover:shadow-lg`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <span className={`transition-all duration-300 ${cell ? 'text-neon-glow' : ''}`}>
                {cell}
              </span>
            </div>
          ))
        )}
      </div>
      <p className="mb-4 text-cyan-300 text-lg font-semibold">{message}</p>
      <Button 
        onClick={resetGame}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Reset Game
      </Button>
      {promotionPawn && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <p className="text-cyan-300 mb-2">Choose promotion piece:</p>
          <div className="flex space-x-2">
            {['♕', '♖', '♗', '♘'].map((piece) => (
              <Button 
                key={piece} 
                onClick={() => handlePromotion(piece)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {piece}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessGame;
