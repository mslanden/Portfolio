import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { isValidMove, isInCheck, getBestMove, pawnPromotion, isDraw } from '../utils/chessUtils';

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
  const [message, setMessage] = useState('Your turn (White)');
  const [isGameOver, setIsGameOver] = useState(false);
  const [promotionPawn, setPromotionPawn] = useState(null);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [gameResult, setGameResult] = useState(null);

  useEffect(() => {
    if (!isWhiteTurn && !isGameOver) {
      setTimeout(makeAIMove, 500);
    }
  }, [isWhiteTurn, isGameOver]);

  const handleCellClick = (row, col) => {
    if (isGameOver || !isWhiteTurn) return;

    if (selectedPiece) {
      movePiece(row, col);
    } else {
      selectPiece(row, col);
    }
  };

  const selectPiece = (row, col) => {
    const piece = board[row][col];
    if (piece && piece.charCodeAt(0) >= 9812 && piece.charCodeAt(0) <= 9817) {
      setSelectedPiece({ row, col });
      setAvailableMoves(getAvailableMoves(row, col));
    }
  };

  const movePiece = (row, col) => {
    const piece = board[selectedPiece.row][selectedPiece.col];
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
    setSelectedPiece(null);
    setAvailableMoves([]);
  };

  const getAvailableMoves = (row, col) => {
    const piece = board[row][col];
    const moves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (isValidMove(piece, row, col, i, j, board)) {
          const newBoard = board.map(row => [...row]);
          newBoard[i][j] = piece;
          newBoard[row][col] = '';
          if (!isInCheck(newBoard, true)) {
            moves.push({ row: i, col: j });
          }
        }
      }
    }
    return moves;
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
      setGameResult("Draw");
    }
  };

  const checkGameState = (newBoard, isWhiteTurn) => {
    if (isInCheck(newBoard, isWhiteTurn)) {
      const hasValidMove = getBestMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove) {
        setIsGameOver(true);
        if (isWhiteTurn) {
          setMessage("Checkmate! Black wins!");
          setGameResult("You lose");
        } else {
          setMessage("Checkmate! White wins!");
          setGameResult("You win");
        }
      } else {
        setMessage(`${isWhiteTurn ? 'White' : 'Black'} is in check!`);
      }
    } else {
      const hasValidMove = getBestMove(newBoard, isWhiteTurn) !== null;
      if (!hasValidMove) {
        setIsGameOver(true);
        setMessage("Game over: Stalemate");
        setGameResult("Draw");
      } else if (isDraw(newBoard)) {
        setIsGameOver(true);
        setMessage("Game over: Draw");
        setGameResult("Draw");
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
    setAvailableMoves([]);
    setGameResult(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 gap-1 mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-10 h-10 flex items-center justify-center text-2xl cursor-pointer
                ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#3e4a61]' : 'bg-[#1a2639]'}
                ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'bg-[#c24d2c]' : ''}
                ${availableMoves.some(move => move.row === rowIndex && move.col === colIndex) ? 'bg-[#d9dad7] bg-opacity-30' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <p className="mb-4 text-[#d9dad7]">{message}</p>
      {gameResult && (
        <p className="text-xl font-bold mb-4 text-[#c24d2c]">
          {gameResult === "You win" ? "Congratulations! You win!" : 
           gameResult === "You lose" ? "Game over. You lose." : 
           "Game over. It's a draw."}
        </p>
      )}
      <Button onClick={resetGame} className="bg-[#c24d2c] text-[#d9dad7] hover:bg-[#d9dad7] hover:text-[#1a2639]">Reset Game</Button>
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
