
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningmessageelement = document.getElementById('winning-message')
const winningmessagetextelement = document.querySelector('[data-wining-message-text]')
const restartButton = document.getElementById('restartbuton')
const winning_combination = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7]
]

let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)

        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()

    winningmessageelement.classList.remove('show')
}
function handleClick(e) {
    const cell = e.target
    const CurrentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, CurrentClass)
    if (checkwin(CurrentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurn()
        setBoardHoverClass()
    }

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw) {
    if (draw) {
        winningmessagetextelement.innerText = 'Draw!'
    }
    else {
        winningmessagetextelement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`


    }

    winningmessageelement.classList.add('show')
}


function placeMark(cell, CurrentClass) {
    cell.classList.add(CurrentClass)
}


function swapTurn() {
    circleTurn = !circleTurn
}


function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

function checkwin(CurrentClass) {
    return winning_combination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(CurrentClass)
        }
        )
    })
}