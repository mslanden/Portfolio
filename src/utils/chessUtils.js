const pieceValues = {
  '♙': 1, '♟': -1,
  '♘': 3, '♞': -3,
  '♗': 3, '♝': -3,
  '♖': 5, '♜': -5,
  '♕': 9, '♛': -9,
  '♔': 100, '♚': -100,
};

// Basic board evaluation function
const evaluateBoard = (board) => {
  let totalEvaluation = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        totalEvaluation += pieceValues[piece] || 0;
      }
    }
  }

  return totalEvaluation;
};

// Minimax algorithm with alpha-beta pruning
const minimax = (board, depth, isWhiteTurn, alpha, beta) => {
  if (depth === 0 || isGameOver(board, isWhiteTurn)) {
    return evaluateBoard(board);
  }

  if (isWhiteTurn) {
    let maxEval = -Infinity;
    const possibleMoves = getAllMoves(board, true);
    for (const move of possibleMoves) {
      const newBoard = makeMove(board, move);
      const eval = minimax(newBoard, depth - 1, false, alpha, beta);
      maxEval = Math.max(maxEval, eval);
      alpha = Math.max(alpha, eval);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    const possibleMoves = getAllMoves(board, false);
    for (const move of possibleMoves) {
      const newBoard = makeMove(board, move);
      const eval = minimax(newBoard, depth - 1, true, alpha, beta);
      minEval = Math.min(minEval, eval);
      beta = Math.min(beta, eval);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
};

// Get all possible moves for a side
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

// Make a move on the board
const makeMove = (board, move) => {
  const newBoard = board.map(row => [...row]);
  newBoard[move.endRow][move.endCol] = move.piece;
  newBoard[move.startRow][move.startCol] = '';
  return newBoard;
};

// Check if the game is over (e.g., no valid moves)
const isGameOver = (board, isWhiteTurn) => {
  const moves = getAllMoves(board, isWhiteTurn);
  return moves.length === 0 || isInCheck(board, isWhiteTurn);
};

// Get the best move using Minimax
const getBestMove = (board, isWhiteTurn, depth = 3) => {
  let bestMove = null;
  let bestEval = isWhiteTurn ? -Infinity : Infinity;

  const possibleMoves = getAllMoves(board, isWhiteTurn);
  for (const move of possibleMoves) {
    const newBoard = makeMove(board, move);
    const eval = minimax(newBoard, depth - 1, !isWhiteTurn, -Infinity, Infinity);

    if (isWhiteTurn ? eval > bestEval : eval < bestEval) {
      bestEval = eval;
      bestMove = move;
    }
  }

  return bestMove;
};

// Your existing code
const isValidPosition = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

const isValidMove = (piece, startRow, startCol, endRow, endCol, board) => {
  if (!isValidPosition(endRow, endCol) || !board[endRow] || board[endRow][endCol] === undefined) {
    return false;
  }

  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);

  if (board[endRow][endCol] && !isOpponentPiece(piece, board[endRow][endCol])) {
    return false;
  }

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

const isPawnMove = (piece, startRow, startCol, endRow, endCol, rowDiff, colDiff, board) => {
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
};

const isPathBlocked = (startRow, startCol, endRow, endCol, board) => {
  const rowStep = Math.sign(endRow - startRow);
  const colStep = Math.sign(endCol - startCol);

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
  const kingPosition = findKingPosition(board, king);

  if (!kingPosition) return false;

  return board.some((row, rowIndex) =>
    row.some((piece, colIndex) =>
      piece && isOpponentPiece(king, piece) &&
      isValidMove(piece, rowIndex, colIndex, kingPosition.row, kingPosition.col, board)
    )
  );
};

const findKingPosition = (board, king) => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        return { row, col };
      }
    }
  }
  return null;
};

// Instead of getRandomMove, use getBestMove for intelligent decisions
const nextMove = getBestMove(board, isWhiteTurn, 3);
if (nextMove) {
  // Apply the move to the board
  board = makeMove(board, nextMove);
}

const pawnPromotion = (board, row, col, newPiece) => {
  const newBoard = board.map(row => [...row]);
  newBoard[row][col] = newPiece;
  return newBoard;
};

export { isValidMove, isOpponentPiece, isInCheck, getBestMove, pawnPromotion };
