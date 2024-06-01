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
// reverse ids as the white pieces are at the bottom of the board
reverseIds()
let startPositionId, draggedElement, endPosition

allSquares.forEach(square => {
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dropPiece);
});

function dragStart(e) {
    //div.piece - parent of img, parent of div.piece - square
    draggedElement = e.target.parentNode
    //console.log(draggedElement)
    startPositionId = draggedElement.parentNode.getAttribute('square-id')
    // save the HTML of the dragged piece
    e.dataTransfer.setData('text/html', draggedElement.outerHTML)
}

function dragOver(e) {
    e.preventDefault()
}

function dropPiece(e) {    
    const correctGo = draggedElement.firstChild.classList.contains(playerGo) //img contains class white or black
    const taken = e.target.parentNode.classList.contains('piece') //div contains class piece
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === "white" ? "black" : "white"
    const takenByOpponent = e.target.classList.contains(opponentGo) //true if taken by opponent, false - if not

    if (correctGo) {
        if (takenByOpponent && valid) {
            //square appends div of dragged element
            e.target.parentNode.parentNode.append(draggedElement) 
            //remove the div of the taken piece
            e.target.parentNode.remove() 
            changePlayer()
            return    
        } 
        if (taken && !takenByOpponent) {
            infoDisplay.textContent = "Invalid move"
            setTimeout(() => infoDisplay.textContent = '', 2000)
            return
        }
        if (valid) {
            e.target.append(draggedElement)
            changePlayer()
            return
        }
    }
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log(targetId, startId, piece)
    switch (piece) {
        case "pawn":
            const startRow = [8,9,10,11,12,13,14,15]
            if (
                startRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId ||
                startId + width - 1 === targetId && 
                // if there is a piece on the diagonal square
                document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width + 1 === targetId && 
                document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
            ){
                return true
            }
            break
        case "knight":
            if (
                startId + width * 2 - 1 === targetId ||
                startId + width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width * 2 + 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId
            ){
                return true
            }
            break
        case "bishop":
            if (
                // up left ++
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId 
                    // and if there is nothing on the diagonal square it jumps over
                    && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId 
                    && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId 
                    && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId 
                    && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId 
                    && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId 
                    && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild || 
                // up right +-
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId 
                    && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId 
                    && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId 
                    && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId 
                    && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId 
                    && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId 
                    && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild ||
                // down left -+
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId 
                    && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId 
                    && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId 
                    && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId 
                    && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId 
                    && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId 
                    && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild || 
                // down right --
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId 
                    && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId 
                    && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId 
                    && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId 
                    && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId 
                    && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId 
                    && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild 
                    && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild
                    && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild
                ) {
                return true
            }
            break
        case "rook":

    }
}

function changePlayer() {
    reverseIds() // reverse the ids to match the playerGo
    if (playerGo === "white") {
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = 'black'
    } else {
        reverseIds()
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