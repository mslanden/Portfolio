const pieceValues = {
  '♙': 1, '♟': -1, '♘': 3, '♞': -3, '♗': 3, '♝': -3,
  '♖': 5, '♜': -5, '♕': 9, '♛': -9, '♔': 100, '♚': -100
};

const evaluateBoard = (board) => board.flat().reduce((total, piece) => total + (pieceValues[piece] || 0), 0);

const isValidPosition = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

const isOpponentPiece = (piece1, piece2) => (piece1.charCodeAt(0) < 9818) !== (piece2.charCodeAt(0) < 9818);

const findKingPosition = (board, king) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) return { row, col };
    }
  }
  return null;
};

const isPathBlocked = (startRow, startCol, endRow, endCol, board) => {
  const rowStep = Math.sign(endRow - startRow);
  const colStep = Math.sign(endCol - startCol);
  for (let row = startRow + rowStep, col = startCol + colStep;
       row !== endRow || col !== endCol;
       row += rowStep, col += colStep) {
    if (board[row][col] !== '') return true;
  }
  return false;
};

const isPawnMove = (piece, startRow, startCol, endRow, endCol, rowDiff, colDiff, board) => {
  const direction = piece === '♟' ? 1 : -1;
  if (startCol === endCol) {
    if (rowDiff === 1 && startRow + direction === endRow && !board[endRow][endCol]) return true;
    if (rowDiff === 2 && startRow + 2 * direction === endRow && !board[endRow][endCol] && 
        !board[startRow + direction][startCol] && 
        ((piece === '♟' && startRow === 1) || (piece === '♙' && startRow === 6))) return true;
  } else if (rowDiff === 1 && colDiff === 1 && startRow + direction === endRow && 
             board[endRow][endCol] && isOpponentPiece(piece, board[endRow][endCol])) {
    return true;
  }
  return false;
};

const isValidMove = (piece, startRow, startCol, endRow, endCol, board) => {
  if (!isValidPosition(endRow, endCol) || (board[endRow][endCol] && !isOpponentPiece(piece, board[endRow][endCol]))) {
    return false;
  }

  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);

  switch (piece.toLowerCase()) {
    case '♟':
    case '♙':
      return isPawnMove(piece, startRow, startCol, endRow, endCol, rowDiff, colDiff, board);
    case '♜':
    case '♖':
      return (startRow === endRow || startCol === endCol) && !isPathBlocked(startRow, startCol, endRow, endCol, board);
    case '♞':
    case '♘':
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    case '♝':
    case '♗':
      return rowDiff === colDiff && !isPathBlocked(startRow, startCol, endRow, endCol, board);
    case '♛':
    case '♕':
      return ((startRow === endRow || startCol === endCol) || (rowDiff === colDiff)) && 
             !isPathBlocked(startRow, startCol, endRow, endCol, board);
    case '♚':
    case '♔':
      return rowDiff <= 1 && colDiff <= 1;
    default:
      return false;
  }
};

const isInCheck = (board, isWhiteTurn) => {
  const king = isWhiteTurn ? '♔' : '♚';
  const kingPosition = findKingPosition(board, king);
  if (!kingPosition) return false;

  return board.some((row, rowIndex) =>
    row.some((piece, colIndex) =>
      piece && isOpponentPiece(king, piece) &&
      isValidMove(piece, rowIndex, colIndex, kingPosition.row, kingPosition.col, board)
    )
  );
};

const makeMove = (board, move) => {
  const newBoard = board.map(row => [...row]);
  newBoard[move.endRow][move.endCol] = move.piece;
  newBoard[move.startRow][move.startCol] = '';
  return newBoard;
};

const getAllMoves = (board, isWhiteTurn) => {
  const moves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && ((isWhiteTurn && piece.charCodeAt(0) <= 9817) || (!isWhiteTurn && piece.charCodeAt(0) >= 9818))) {
        for (let endRow = 0; endRow < 8; endRow++) {
          for (let endCol = 0; endCol < 8; endCol++) {
            if (isValidMove(piece, row, col, endRow, endCol, board)) {
              moves.push({ piece, startRow: row, startCol: col, endRow, endCol });
            }
          }
        }
      }
    }
  }
  return moves;
};

const minimax = (board, depth, isWhiteTurn, alpha, beta) => {
  if (depth === 0) return evaluateBoard(board);

  const moves = getAllMoves(board, isWhiteTurn);
  if (moves.length === 0) return isWhiteTurn ? -Infinity : Infinity;

  let bestEvaluation = isWhiteTurn ? -Infinity : Infinity;
  for (const move of moves) {
    const newBoard = makeMove(board, move);
    const evaluation = minimax(newBoard, depth - 1, !isWhiteTurn, alpha, beta);
    
    if (isWhiteTurn) {
      bestEvaluation = Math.max(bestEvaluation, evaluation);
      alpha = Math.max(alpha, evaluation);
    } else {
      bestEvaluation = Math.min(bestEvaluation, evaluation);
      beta = Math.min(beta, evaluation);
    }
    
    if (beta <= alpha) break;
  }
  return bestEvaluation;
};

const getBestMove = (board, isWhiteTurn, depth = 3) => {
  let bestMove = null;
  let bestEvaluation = isWhiteTurn ? -Infinity : Infinity;
  const moves = getAllMoves(board, isWhiteTurn);

  for (const move of moves) {
    const newBoard = makeMove(board, move);
    const evaluation = minimax(newBoard, depth - 1, !isWhiteTurn, -Infinity, Infinity);

    if (isWhiteTurn ? evaluation > bestEvaluation : evaluation < bestEvaluation) {
      bestEvaluation = evaluation;
      bestMove = move;
    }
  }

  return bestMove;
};

const pawnPromotion = (board, row, col, newPiece) => {
  const newBoard = board.map(row => [...row]);
  newBoard[row][col] = newPiece;
  return newBoard;
};

const isDraw = (board) => {
  // Check for insufficient material
  const pieces = board.flat().filter(piece => piece !== '');
  if (pieces.length === 2) return true; // Only kings left
  if (pieces.length === 3 && (pieces.includes('♗') || pieces.includes('♝') || pieces.includes('♘') || pieces.includes('♞'))) return true; // King and bishop/knight vs king

  // Check for threefold repetition (simplified version)
  // In a real implementation, you'd need to keep track of the board state history
  // Here we're just checking if the current board state has occurred before
  // This is a placeholder and won't actually detect threefold repetition
  return false;
};

export { isValidMove, isOpponentPiece, isInCheck, getBestMove, pawnPromotion, isDraw };
