const Player = (mark, turn, playerScore) => {
  return { mark, turn, playerScore }
}

const gameDisplay = (() => {
  const fields = document.querySelectorAll('.field')
  const message = document.querySelector('#playerStatus')
  const xScore = document.querySelector('#xScore')
  const oScore = document.querySelector('#oScore')
  const board = ['', '', '', '', '', '', '', '', '']
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

  const reStartGame = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = ''
      fields[i].textContent = ''
      fields[i].classList.remove('clicked')
      fields[i].classList.remove('draw')
      fields[i].classList.remove('highlight')
    }
  }
  return {
    fields,
    message,
    xScore,
    oScore,
    board,
    winningCombinations,
    roundWon,
    reStartGame,
    restart,
  }
})()

const startGame = (() => {
  const playerEx = Player('X', true, 0)
  const playerCircle = Player('O', false, 0)

  gameDisplay.restart.addEventListener('click', (e) => {
    gameDisplay.roundWon = false
    gameDisplay.reStartGame()
    playerEx.turn = true
    playerCircle.turn = false
    gameDisplay.message.textContent = `${playerEx.mark}'s turn`
  })

  const handleClick = (e) => {
    const cell = e.target

    if (playerEx.turn == true && cell.textContent == '') {
      cell.textContent = playerEx.mark
      cell.classList.add('clicked')
      gameDisplay.board[cell.id] = playerEx.mark
      playerEx.turn = false
      playerCircle.turn = true
      gameDisplay.message.textContent = `${playerCircle.mark}'s turn`
      calculateWinner(playerEx.mark)
    }

    if (playerCircle.turn == true && cell.textContent == '') {
      cell.textContent = playerCircle.mark
      cell.classList.add('clicked')
      gameDisplay.board[cell.id] = playerCircle.mark
      playerEx.turn = true
      playerCircle.turn = false
      gameDisplay.message.textContent = `${playerEx.mark}'s turn`
      calculateWinner(playerCircle.mark)
    }
  }

  gameDisplay.fields.forEach((field) => {
    field.addEventListener('click', handleClick)
  })

  const calculateWinner = (player) => {
    for (let i = 0; i < gameDisplay.winningCombinations.length; i++) {
      const condition = gameDisplay.winningCombinations[i]
      const cellA = gameDisplay.board[condition[0]]
      const cellB = gameDisplay.board[condition[1]]
      const cellC = gameDisplay.board[condition[2]]

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
        gameDisplay.roundWon = true
        break
      }
    }

    if (gameDisplay.roundWon) {
      gameDisplay.message.textContent = `${player} WON`

      if (player === 'X') {
        playerEx.playerScore++
        gameDisplay.xScore.textContent = playerEx.playerScore
      }
      if (player === 'O') {
        playerCircle.playerScore++
        gameDisplay.oScore.textContent = playerCircle.playerScore
      }
      playerEx.turn = false
      playerCircle.turn = false
    } else if (!gameDisplay.board.includes('')) {
      gameDisplay.message.textContent = `Draw`
      gameDisplay.fields.forEach((i) => {
        i.classList.add('draw')
      })
    }
  }
})()
