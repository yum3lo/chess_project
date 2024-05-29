import { dragStart, dragOver, dragDrop } from './dragFunctions.js';
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

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPosition
let draggedElement

function dragStart(e) {
    e.stopPropagation()
    startPosition = e.target.parentNode.getAttribute('square-id') //square
    draggedElement = e.target.parentNode //div
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    e.target.append(draggedElement)
}