import React from 'react';

const ChessBoard = ({ board, selectedPiece, availableMoves, handleCellClick }) => {
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
  );
};

export default ChessBoard;