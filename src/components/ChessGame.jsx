import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { isValidMove, isInCheck, getBestMove, pawnPromotion, isDraw } from '../utils/chessUtils';
import { motion, AnimatePresence } from "framer-motion";
import ChessMenu from './ChessMenu';

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

const ChessGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [message, setMessage] = useState('White\'s turn');
  const [isGameOver, setIsGameOver] = useState(false);
  const [promotionPawn, setPromotionPawn] = useState(null);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [gameResult, setGameResult] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gameMode, setGameMode] = useState('ai');

  useEffect(() => {
    if (!isWhiteTurn && !isGameOver && gameMode === 'ai') {
      setTimeout(makeAIMove, 500);
    }
  }, [isWhiteTurn, isGameOver, gameMode]);

  const handleCellClick = (row, col) => {
    if (isGameOver || (gameMode === 'ai' && !isWhiteTurn)) return;
    selectedPiece ? movePiece(row, col) : selectPiece(row, col);
  };

  const selectPiece = (row, col) => {
    const piece = board[row][col];
    if (piece && ((isWhiteTurn && piece.charCodeAt(0) <= 9817) || (!isWhiteTurn && piece.charCodeAt(0) >= 9818))) {
      setSelectedPiece({ row, col });
      setAvailableMoves(getAvailableMoves(row, col));
    }
  };

  const movePiece = (row, col) => {
    const piece = board[selectedPiece.row][selectedPiece.col];
    if (isValidMove(piece, selectedPiece.row, selectedPiece.col, row, col, board)) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = piece;
      newBoard[selectedPiece.row][selectedPiece.col] = '';

      if (!isInCheck(newBoard, isWhiteTurn)) {
        setBoard(newBoard);
        piece === '♙' && row === 0 ? setPromotionPawn({ row, col }) : finishTurn(newBoard);
      } else {
        setMessage("Invalid move: King would be in check");
      }
    } else {
      setMessage("Invalid move");
    }
    setSelectedPiece(null);
    setAvailableMoves([]);
  };

  const getAvailableMoves = (row, col) => {
    const piece = board[row][col];
    const moves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isValidMove(piece, row, col, i, j, board)) {
          const newBoard = board.map(r => [...r]);
          newBoard[i][j] = piece;
          newBoard[row][col] = '';
          if (!isInCheck(newBoard, isWhiteTurn)) {
            moves.push({ row: i, col: j });
          }
        }
      }
    }
    return moves;
  };

  const finishTurn = (newBoard) => {
    setIsWhiteTurn(!isWhiteTurn);
    setMessage(isWhiteTurn ? "Black's turn" : "White's turn");
    checkGameState(newBoard, !isWhiteTurn);
  };

  const makeAIMove = () => {
    const move = getBestMove(board, false);
    if (move) {
      const { startRow, startCol, endRow, endCol } = move;
      const newBoard = board.map(r => [...r]);
      newBoard[endRow][endCol] = newBoard[startRow][startCol];
      newBoard[startRow][startCol] = '';
      setBoard(newBoard);
      finishTurn(newBoard);
    } else {
      endGame("Game over: Stalemate", "Draw");
    }
  };

  const checkGameState = (newBoard, isWhiteTurn) => {
    if (isInCheck(newBoard, isWhiteTurn)) {
      const hasValidMove = getBestMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove) {
        endGame(isWhiteTurn ? "Checkmate! Black wins!" : "Checkmate! White wins!", isWhiteTurn ? "Black wins" : "White wins");
      } else {
        setMessage(`${isWhiteTurn ? 'White' : 'Black'} is in check!`);
      }
    } else {
      const hasValidMove = getBestMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove || isDraw(newBoard)) {
        endGame("Game over: Draw", "Draw");
      }
    }
  };

  const endGame = (message, result) => {
    setIsGameOver(true);
    setMessage(message);
    setGameResult(result);
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
    setMessage('White\'s turn');
    setIsGameOver(false);
    setPromotionPawn(null);
    setAvailableMoves([]);
    setGameResult(null);
    setIsMenuOpen(false);
  };

  const toggleGameMode = () => {
    setGameMode(gameMode === 'ai' ? 'friend' : 'ai');
    resetGame();
  };

  const getPieceColor = (piece) => {
    const isWhitePiece = piece.charCodeAt(0) <= 9817;
    return isWhitePiece ? 'text-[#00FFFF]' : 'text-[#FF1493]';
  };

  const getAvailableMoveColor = (rowIndex, colIndex) => {
    const index = (rowIndex + colIndex) % 3;
    const colors = ['bg-[#FFA500]', 'bg-[#FF8C00]', 'bg-[#FF4500]'];
    return colors[index];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 gap-1 mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-10 flex items-center justify-center text-2xl cursor-pointer
                ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#1a2639]' : 'bg-[#3e4a61]'}
                ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'bg-[#c24d2c]' : ''}
                ${availableMoves.some(move => move.row === rowIndex && move.col === colIndex) ? `${getAvailableMoveColor(rowIndex, colIndex)} bg-opacity-50` : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <span className={getPieceColor(cell)}>{cell}</span>
            </div>
          ))
        )}
      </div>
      <p className="mb-4 text-[#d9dad7]">{message}</p>
      {gameResult && (
        <p className="text-xl font-bold mb-4 text-[#c24d2c]">
          {gameResult === "White wins" ? "Congratulations! White wins!" : 
           gameResult === "Black wins" ? "Congratulations! Black wins!" : 
           "Game over. It's a draw."}
        </p>
      )}
      <ChessMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        resetGame={resetGame}
        toggleGameMode={toggleGameMode}
        gameMode={gameMode}
      />
      {promotionPawn && (
        <div className="mt-4">
          <p className="text-[#d9dad7]">Choose promotion piece:</p>
          <div className="flex space-x-2">
            {['♕', '♖', '♗', '♘'].map((piece) => (
              <Button key={piece} onClick={() => handlePromotion(piece)} className="bg-[#3e4a61] text-[#d9dad7] hover:bg-[#c24d2c]">{piece}</Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessGame;
