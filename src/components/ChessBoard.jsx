import React from 'react';

const ChessBoard = ({ board, selectedPiece, availableMoves, handleCellClick }) => {
  const getPieceStyle = (piece) => {
    const isWhitePiece = piece.charCodeAt(0) <= 9817;
    return isWhitePiece
      ? 'text-[#FFFFFF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
      : 'text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]';
  };

  const getAvailableMoveColor = () => 'bg-[#4CAF50]';
  const getSelectedPieceColor = () => 'bg-[#2E7D32]'; // Darker green for selected piece

  return (
    <div className="w-full max-w-[min(64vw,400px)] aspect-square mx-auto"> {/* Reduced from 80vw to 64vw and 500px to 400px */}
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
                  textShadow: cell.charCodeAt(0) <= 9817 ? '0 0 3px rgba(0,0,0,0.8)' : '0 0 3px rgba(255,255,255,0.8)',
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
