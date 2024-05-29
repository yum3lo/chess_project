const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
const startPieces = [
    rook_b, knight_b, bishop_b, queen_b, king_b, bishop_b, knight_b, rook_b,
    pawn_b, pawn_b, pawn_b, pawn_b, pawn_b, pawn_b, pawn_b, pawn_b,
    '', '', '', '', '', '', '', '', 
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn_w, pawn_w, pawn_w, pawn_w, pawn_w, pawn_w, pawn_w, pawn_w,
    rook_w, knight_w, bishop_w, queen_w, king_w, bishop_w, knight_w, rook_w
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        const piece = square.querySelector('.piece img');
        if (piece) {
            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragStart);
        }
        square.setAttribute('square-id', i)
        const row = Math.floor( (63 - i) / 8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "pink" : "blue")
        } else {
            square.classList.add(i % 2 === 0 ? "blue" : "pink") 
        }
        gameBoard.append(square)
    });
}

createBoard()

const allSquares = document.querySelectorAll("#gameboard .square")
let startPosition, draggedElement, endPosition

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dropPiece)
})

function dragStart(e) {
    //div.piece - parent of img, parent of div.piece - square
    draggedElement = e.target.parentNode.parentNode
    startPosition = draggedElement.getAttribute('square-id') //square
}

function dragOver(e) {
    // if target = free square, endPosition - square-id of target
    // if target = a piece, endPosition - square-id of the parent of target
    endPosition = e.target.getAttribute('square-id') || e.target.parentNode.getAttribute('square-id')
    e.preventDefault()
}


function dropPiece(e) {
    if (endPosition) {
        const startPiece = draggedElement.innerHTML;
        const target = e.target;
  
        // remove the piece from the start position
        draggedElement.innerHTML = "";
  
        // if target = an image, drop the piece in the parent of the parent of the target (the square)
        // if an empty square, drop the piece in the target itself
        if (target.tagName === "IMG") {
            target.parentNode.parentNode.innerHTML = startPiece;
        } else {
            target.innerHTML = startPiece;
        }
    
        // reset variables
        draggedElement = null;
        startPosition = null;
        endPosition = null;
    }
  }