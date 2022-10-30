// const X = [].sort((a, b) => {
//   return a - b
// })

// const O = [].sort((a, b) => {
//   return a - b
// })

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ]
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i]
//     // console.log([a, b, c])
//     // console.log(squares)
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       console.log(squares[a])
//       return squares[a]
//     }
//   }
//   return null
// }

// const player = (mark, turn) => {
//   return { mark, turn }
// }

// const playerX = player('X', true)
// const playerO = player('O', false)

// const fields = document.querySelectorAll('.field')
// fields.forEach((field) => {
//   field.addEventListener('click', (e) => {
//     if (playerX.turn == true && field.textContent == '') {
//       X.push(Number(e.target.id))
//       field.textContent = playerX.mark
//       field.classList.add('clicked')
//       // console.log(X)
//       calculateWinner(X)
//       playerX.turn = false
//       playerO.turn = true
//     }

//     if (playerO.turn == true && field.textContent == '') {
//       O.push(Number(e.target.id))
//       field.textContent = playerO.mark
//       field.classList.add('clicked')
//       // console.log(O)
//       calculateWinner(O)
//       playerX.turn = true
//       playerO.turn = false
//     }

//   })
// })

const fields = document.querySelectorAll('.field')
const playerStatus = document.getElementById('playerStatus')
console.log(playerStatus)

const player = (mark, turn) => {
  return { mark, turn }
}

const board = ['', '', '', '', '', '', '', '', '']
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
      fields.forEach((i) => {
       console.log(condition[0])
        console.log(i)
      })
      if (fields) roundWon = true
      break
    }
  }

  if (roundWon) {
    playerStatus.textContent = `Player ${player} Won`
    playerEx.turn = false
    playerCircle.turn = false
  }
}
fields.forEach((field) => {
  field.addEventListener('click', handleClick, { once: true })
})
