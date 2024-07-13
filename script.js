const X_CLASS = 'x'
const O_CLASS = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')
const themeToggle = document.getElementById('theme')
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let oTurn

startGame()

restartButton.addEventListener('click', startGame)
themeToggle.addEventListener('change', toggleTheme)

// Load theme from local storage
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode')
    themeToggle.checked = true
}

function startGame() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.textContent = ''
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        setTimeout(() => endGame(false), 100)
    } else if (isDraw()) {
        setTimeout(() => endGame(true), 100)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        alert("Draw!")
    } else {
        alert(`${oTurn ? "O's" : "X's"} Wins!`)
    }
    startGame()
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
    cell.textContent = currentClass.toUpperCase()
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode')
    localStorage.setItem('dark-mode', themeToggle.checked)
}
