import React from 'react';

const ChessBoard = ({ board, selectedPiece, availableMoves, handleCellClick }) => {
  const getPieceStyle = (piece) => {
    const pieceCode = piece.charCodeAt(0);
    if (pieceCode >= 9812 && pieceCode <= 9817) {
      return 'text-[#0000FF] drop-shadow-[0_1px_2px_rgba(0,0,255,0.8)]';
    } else if (pieceCode >= 9818 && pieceCode <= 9823) {
      return 'text-[#000000] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]';
    }
    return '';
  };

  const getAvailableMoveColor = () => 'bg-[#4CAF50]';
  const getSelectedPieceColor = () => 'bg-[#2E7D32]'; // Darker green for selected piece

  return (
    <div className="w-full max-w-[min(64vw,400px)] aspect-square mx-auto">
      <div className="grid grid-cols-8 gap-0.5 p-2 bg-[#3e4a61] rounded-lg shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square flex items-center justify-center text-base sm:text-lg md:text-xl cursor-pointer
                ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#d9dad7]' : 'bg-[#8b9bb4]'}
                ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? getSelectedPieceColor() : ''}
                ${availableMoves.some(move => move.row === rowIndex && move.col === colIndex) ? `${getAvailableMoveColor()} bg-opacity-50` : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              <span 
                className={`${getPieceStyle(cell)} transition-all duration-200 hover:scale-110`}
                style={{
                  fontFamily: "'Noto Sans', 'Segoe UI Symbol', 'Arial Unicode MS', sans-serif",
                }}
              >
                {cell}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;