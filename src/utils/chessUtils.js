const isValidMove = (piece, startRow, startCol, endRow, endCol, board) => {
  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);

  switch (piece.toLowerCase()) {
    case '♟':
    case '♙':
      // Pawn movement
      const direction = piece === '♟' ? 1 : -1;
      if (startCol === endCol) {
        if (rowDiff === 1 && startRow + direction === endRow && !board[endRow][endCol]) return true;
        if (rowDiff === 2 && startRow + 2 * direction === endRow && !board[endRow][endCol] && !board[startRow + direction][startCol] && 
            ((piece === '♟' && startRow === 1) || (piece === '♙' && startRow === 6))) return true;
      } else if (rowDiff === 1 && colDiff === 1 && startRow + direction === endRow && board[endRow][endCol] && 
                 isOpponentPiece(piece, board[endRow][endCol])) {
        return true;
      }
      return false;
    case '♜':
    case '♖':
      // Rook movement
      return (startRow === endRow || startCol === endCol) && !isPathBlocked(startRow, startCol, endRow, endCol, board);
    case '♞':
    case '♘':
      // Knight movement
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    case '♝':
    case '♗':
      // Bishop movement
      return rowDiff === colDiff && !isPathBlocked(startRow, startCol, endRow, endCol, board);
    case '♛':
    case '♕':
      // Queen movement
      return ((startRow === endRow || startCol === endCol) || (rowDiff === colDiff)) && 
             !isPathBlocked(startRow, startCol, endRow, endCol, board);
    case '♚':
    case '♔':
      // King movement
      return rowDiff <= 1 && colDiff <= 1;
    default:
      return false;
  }
};

const isPathBlocked = (startRow, startCol, endRow, endCol, board) => {
  const rowStep = startRow < endRow ? 1 : startRow > endRow ? -1 : 0;
  const colStep = startCol < endCol ? 1 : startCol > endCol ? -1 : 0;

  let currentRow = startRow + rowStep;
  let currentCol = startCol + colStep;

  while (currentRow !== endRow || currentCol !== endCol) {
    if (board[currentRow][currentCol] !== '') {
      return true;
    }
    currentRow += rowStep;
    currentCol += colStep;
  }

  return false;
};

const isOpponentPiece = (piece1, piece2) => {
  return (piece1.charCodeAt(0) < 9818 && piece2.charCodeAt(0) >= 9818) || 
         (piece1.charCodeAt(0) >= 9818 && piece2.charCodeAt(0) < 9818);
};

const isInCheck = (board, isWhiteTurn) => {
  const king = isWhiteTurn ? '♔' : '♚';
  let kingRow, kingCol;

  // Find the king's position
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        kingRow = row;
        kingCol = col;
        break;
      }
    }
    if (kingRow !== undefined) break;
  }

  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && isOpponentPiece(king, piece)) {
        if (isValidMove(piece, row, col, kingRow, kingCol, board)) {
          return true;
        }
      }
    }
  }

  return false;
};

export { isValidMove, isOpponentPiece, isInCheck };