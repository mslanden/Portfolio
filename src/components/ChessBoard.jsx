import React from 'react';

const ChessBoard = ({ board, selectedPiece, availableMoves, handleCellClick }) => {
  const getPieceStyle = (piece) => {
    const isWhitePiece = piece.charCodeAt(0) <= 9817;
    return isWhitePiece
      ? 'text-[#F0F0F0] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]'
      : 'text-[#1A1A1A] drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]';
  };

  const getAvailableMoveColor = (rowIndex, colIndex) => {
    const index = (rowIndex + colIndex) % 3;
    const colors = ['bg-[#FFA500]', 'bg-[#FF8C00]', 'bg-[#FF4500]'];
    return colors[index];
  };

  return (
    <div className="grid grid-cols-8 gap-1 p-4 bg-[#3e4a61] rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-12 h-12 flex items-center justify-center text-3xl cursor-pointer
              ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#d9dad7]' : 'bg-[#8b9bb4]'}
              ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'bg-[#c24d2c]' : ''}
              ${availableMoves.some(move => move.row === rowIndex && move.col === colIndex) ? `${getAvailableMoveColor(rowIndex, colIndex)} bg-opacity-50` : ''}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            <span className={`${getPieceStyle(cell)} transition-all duration-200 hover:scale-110`}>{cell}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;
