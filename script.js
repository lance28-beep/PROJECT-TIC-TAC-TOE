const fields = document.querySelectorAll('.field')
let playerStatus = document.getElementById('playerStatus')
const button = document.getElementById('restart')

const player = (mark, turn) => {
  return { mark, turn }
}

button.addEventListener('click', e => {
  console.log(clicked)
})
let board = ['', '', '', '', '', '', '', '', '']
const playerEx = player('X', true)
const playerCircle = player('O', false)
let roundWon = false


const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const handleClick = (e) => {
  const cell = e.target
  if (playerEx.turn == true && cell.textContent == '') {
    cell.textContent = playerEx.mark
    cell.classList.add('clicked')
    board[cell.id] = playerEx.mark
    playerEx.turn = false
    playerCircle.turn = true
    calculateWinner(playerEx.mark)
  }

  if (playerCircle.turn == true && cell.textContent == '') {
    cell.textContent = playerCircle.mark
    cell.classList.add('clicked')
    board[cell.id] = playerCircle.mark
    playerEx.turn = true
    playerCircle.turn = false
    calculateWinner(playerCircle.mark)
  }
}

const placeMark = (cell, CurrentPlayer) => {
  cell.textContent = CurrentPlayer
  !CurrentPlayer.mark
  cell.classList.add('clicked')
}

const calculateWinner = (player) => {
  console.log(player)
  for (let i = 0; i < winningCombinations.length; i++) {
    const condition = winningCombinations[i]
    const cellA = board[condition[0]]
    const cellB = board[condition[1]]
    const cellC = board[condition[2]]

    if (cellA == '' || cellB == '' || cellB == '') {
      continue
    }
    if (cellA == cellB && cellB == cellC) {
      const boxA = document
        .getElementById(condition[0])
        .classList.add('highlight')
      const boxB = document
        .getElementById(condition[1])
        .classList.add('highlight')
      const boxC = document
        .getElementById(condition[2])
        .classList.add('highlight')
      roundWon = true
      break
    }
  }

  if (roundWon) {
    playerStatus.textContent = `Player ${player} Won`
    playerEx.turn = false
    playerCircle.turn = false
  } else if (!board.includes('')) {
    playerStatus.textContent = `Draw`
    fields.forEach((i) => {
      i.classList.add('draw')
    })
  }
}
fields.forEach((field) => {
  field.addEventListener('click', handleClick, { once: true })
})


