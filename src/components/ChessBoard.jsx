import React from 'react';

const ChessBoard = ({ board, selectedPiece, availableMoves, handleCellClick }) => {
  const getPieceStyle = (piece) => {
    const isWhitePiece = piece.charCodeAt(0) <= 9817;
    return isWhitePiece
      ? 'text-[#FFFFFF] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]'
      : 'text-[#000000] drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)]';
  };

  const getAvailableMoveColor = (rowIndex, colIndex) => {
    const index = (rowIndex + colIndex) % 3;
    const colors = ['bg-[#FFA500]', 'bg-[#FF8C00]', 'bg-[#FF4500]'];
    return colors[index];
  };

  return (
    <div className="grid grid-cols-8 gap-1 p-6 bg-[#3e4a61] rounded-lg shadow-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-14 h-14 flex items-center justify-center text-4xl cursor-pointer
              ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#d9dad7]' : 'bg-[#8b9bb4]'}
              ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'bg-[#c24d2c]' : ''}
              ${availableMoves.some(move => move.row === rowIndex && move.col === colIndex) ? `${getAvailableMoveColor(rowIndex, colIndex)} bg-opacity-50` : ''}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            <span className={`${getPieceStyle(cell)} transition-all duration-200 hover:scale-110 ${cell ? 'text-stroke-1 text-stroke-black' : ''}`}>{cell}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;
