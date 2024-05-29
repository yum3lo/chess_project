const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = "white"
playerDisplay.textContent = playerGo

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

const allSquares = document.querySelectorAll(".square")
let startPosition, draggedElement, endPosition

allSquares.forEach(square => {
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dropPiece);
});

function dragStart(e) {
    //div.piece - parent of img, parent of div.piece - square
    draggedElement = e.target.parentNode
    startPosition = draggedElement.parentNode.getAttribute('square-id')
    // save the HTML of the dragged piece
    e.dataTransfer.setData('text/html', draggedElement.outerHTML)
}

function dragOver(e) {
    e.preventDefault()
}

function dropPiece(e) {
    e.preventDefault();
    const targetSquare = e.target.closest('.square');
    endPosition = targetSquare.getAttribute('square-id');
    
    if (startPosition !== endPosition) {
        targetSquare.innerHTML = e.dataTransfer.getData('text/html');
        const newPiece = targetSquare.querySelector('.piece img');
        if (newPiece) {
            newPiece.setAttribute('draggable', true);
            newPiece.addEventListener('dragstart', dragStart);
        }

        // clear the original square
        const originalSquare = document.querySelector(`.square[square-id='${startPosition}']`);
        originalSquare.innerHTML = '';
    }
    
    // reset variables
    draggedElement = null;
    startPosition = null;
    endPosition = null;

    const taken = e.target.classList.contains('piece')
    chnagePlayer()
}

function chnagePlayer() {
    if (playerGo === "white") {
        // reverse ids of squares, like turning the gameboard upside down
        reverseIds()
        playerGo = "black"
        playerDisplay.textContent = 'black'
    } else {
        revertIds()
        playerGo = "white"
        playerDisplay.textContent = 'white'
    }
}

function reverseIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', (width * width -1) - i))
}

function revertIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', i))
}