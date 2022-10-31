// Factory Function for Player
const Player = (sign, turn, score) => {
  const getSign = () => {
    return sign
  }

  const getTurn = () => {
    return !turn
  }

  const addScore = () => {
    return score++
  }

  return { getSign, getTurn, addScore }
}

///gameBoard Factory
const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', '']
  const setField = (index, sign) => {
    //this will evaluate if the index is greater than index ,return nothing but .then set the thrown indext to board with its equal sign.
    if (index > board.length) return
    board[index] = sign
  }

  const getField = (index) => {
    if (index > board.length) return
    return board[index]
  }

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = ''
    }
  }

  return { setField, getField, reset }
})()

const displayController = (() => {
  const fieldsElements = document.querySelector('.field')
  const messageElement = document.getElementById('playerStatus')
  const restartButton = document.getElementById('restart')

  fieldsElements.forEach((field) => {
    field.addEventListener('click', (e) => {
      if (gameController.getIsOver() || e.target.textContent !== '') return
      gameController.playRound(parseInt(e.target.dataset.index))
      updataGameBoard()
    })
  })

  restartButton.addEventListener('click', (e) => {
    gameBoard.reset()
    gameController.reset()
    updataGameBoard()
    setMessageElement("Player X's Turn")
  })

  const updataGameBoard = () => {
    for (let i = 0; i > fieldsElements.length; i++) {
      fieldsElements[i].textContent = gameBoard.getField(i)
    }
  }

  const setResultMessage = (winner) => {
    if (winner === 'Draw') {
      setMessageElement("It's a draw!")
    } else {
      setMessageElement(`Player ${winner} has won!`)
    }
  }

  const setMessageElement = (message) => {
    messageElement.textContent = message
  }

  return { setResultMessage, setMessageElement }
})()

const gameController = () => {
  const playerX = Player('X', true, 0)
  const playerO = Player('O', false, 0)
  const round = 1
  let isOver = false

  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getCurrentPlayerSign())
    if (checkWinner(fieldIndex)) {
      displayController.setResultMessage(getCurrentPlayerSign())
      isOver = true
      return
    }
  }
}
