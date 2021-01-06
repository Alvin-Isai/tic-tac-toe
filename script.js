const board = document.querySelector('.board')
const xContainer = document.querySelector('.xContainer')
const oContainer = document.querySelector('.oContainer')
const xClass = 'x'
const circleClass = 'circle'
const winner = document.querySelector('.overlay')
const message = document.querySelector('.winnerMessage')
const playerContainer = document.querySelector('.playerContainer')
let circleTurn

const game = (() => {
    const squareDivs = document.querySelectorAll('.square')
    squareDivs.forEach(square => {
        square.addEventListener('click', handleClick, { once: true })
    });
    setHoverClass()

    return {squareDivs}
})();


function handleClick(e) {
    const square = e.target
    const currentClass = circleTurn ? circleClass : xClass
    mark(square, currentClass)
    swapTurns()
    setHoverClass()

    if (checkWin(currentClass)) {
        endGame(false)
    }
    // check for win
    // check for draw
}

function mark(square, currentClass) {
    square.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn
}

function setHoverClass() {
    xContainer.classList.remove('glow')
    oContainer.classList.remove('glow')
    board.classList.remove(circleClass);
    board.classList.remove(xClass);

    if (circleTurn) {

        board.classList.add(circleClass)
        oContainer.classList.add('glow')
    }
    else {
        board.classList.add(xClass)
        xContainer.classList.add('glow')
    }
}

const winningCombo =
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        
        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

function checkWin(currentClass) {
    return winningCombo.some(combo => {
        return combo.every(index => {
            return game.squareDivs[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        console.log('draw')
    }
    else {
        console.log('Winner');
        message.innerText = `${circleTurn ? 'X' : 'O'} Wins!`
        winner.classList.add('show')
        
        
    }
}


function restart() {
    location.reload()
}

function submit() {
    const player1 = document.getElementById('player1').value
    const player2 = document.getElementById('player2').value
    const xName = document.querySelector('.xName')
    const oName = document.querySelector('.oName')

    xName.innerHTML = player1
    oName.innerHTML = player2
    
    playerContainer.classList.add('hide')
}








