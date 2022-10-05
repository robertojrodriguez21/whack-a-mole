// PAGE SELECT
const playGameButton = document.getElementById(`playGameButton`)
const homeButton = document.getElementById(`homeButton`)

if (playGameButton) {
  playGameButton.addEventListener(`click`, () => {
    window.location.href = `game.html`
  })
}

if (homeButton) {
  homeButton.addEventListener(`click`, () => {
    window.location.href = `index.html`
  })
}

// GAME
// Variables
let gameTimer = 10
let randomIndex = 0
let gameStarted = false
let score = 0
let highScore = 0
const boardgameBoxesValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
const numberOne = [1, 2, 7, 12, 17, 21, 22, 23]
const numberTwo = [1, 2, 8, 11, 12, 13, 16, 21, 22, 23]
const numberThree = [1, 2, 3, 8, 11, 12, 13, 18, 21, 22, 23]
const xShape = [0, 4, 6, 8, 12, 16, 18, 20, 24]

// Document Selectors
const boardgameBoxes = document.querySelectorAll(`.boardgameBox`)
const startGameButton = document.getElementById(`startGameButton`)
const resetGameButton = document.getElementById(`resetGameButton`)
const startOverButton = document.getElementById(`startOverButton`)
const scoreText = document.getElementById(`scoreText`)
const highScoreText = document.getElementById(`highScoreText`)

// Functions
// Start Game
const startGame = async () => {
  score = 0
  startGameCountdown()
  await new Promise((resolve) => setTimeout(resolve, 3500))
  while (gameStarted) {
    while (gameTimer > 0) {
      let tempIndex = setMole()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(`${boardgameBoxesValues}`)
      removeMole(tempIndex)

      gameTimer--
    }
    gameStarted = false
  }
  await new Promise((resolve) => setTimeout(resolve, 1500))
  endGame()
}

const startGameCountdown = async () => {
  for (let i = 0; i < numberThree.length; i++) {
    boardgameBoxes[numberThree[i]].style.backgroundColor = `red`
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  clearBoard()
  for (let i = 0; i < numberTwo.length; i++) {
    boardgameBoxes[numberTwo[i]].style.backgroundColor = `yellow`
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  clearBoard()
  for (let i = 0; i < numberOne.length; i++) {
    boardgameBoxes[numberOne[i]].style.backgroundColor = `green`
  }
  await new Promise((resolve) => setTimeout(resolve, 1000))
  clearBoard()
}

const endGame = () => {
  for (let i = 0; i < xShape.length; i++) {
    boardgameBoxes[xShape[i]].style.backgroundColor = `red`
  }
}

// Mole Pop-Up and disappear
const setMole = () => {
  randomIndex = Math.floor(Math.random() * boardgameBoxes.length)
  while (boardgameBoxesValues[randomIndex] === 1) {
    randomIndex = Math.floor(Math.random() * boardgameBoxes.length)
  }

  boardgameBoxes[randomIndex].style.backgroundColor = `brown`
  boardgameBoxesValues[randomIndex] = 1

  return randomIndex
}

// Removes Mole After Timer
const removeMole = async (boxIndex) => {
  if (boardgameBoxesValues[boxIndex] === 1) {
    boardgameBoxesValues[boxIndex] = 3
    boardgameBoxes[boxIndex].style.backgroundColor = `red`
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHole(boxIndex)
  }
}

// Remove Mole and Set Hole
const setHole = (box) => {
  boardgameBoxes[box].style.backgroundColor = `black`
  boardgameBoxesValues[box] = 0
}

// Reset Board and Score
const resetBoard = () => {
  gameStarted = false
  gameTimer = 0
  clearBoard()
}

const resetGame = () => {
  resetBoard()
  highScore = 0
  score = 0
  highScoreText.innerHTML = highScore
  scoreText.innerHTML = score
}

// Clears Board and Values
const clearBoard = () => {
  for (let i = 0; i < boardgameBoxes.length; i++) {
    setHole(i)
  }
}

// Tracks all score changes
const scoreChange = () => {
  score += 1000
  scoreText.innerHTML = score
  if (score > highScore) {
    highScore = score
    highScoreText.innerHTML = highScore
  }
}

// Game Logic
// Start Game
startGameButton.addEventListener(`click`, () => {
  if (!gameStarted) {
    gameStarted = true
    gameTimer = 10
    startGame()
  }
})
// Start Game Over (Reset Board)
startOverButton.addEventListener(`click`, () => {
  resetBoard()
  if (gameStarted) {
    gameStarted = false
    gameTimer = 10
    startGame()
  }
})
// Reset Game (Score and Board)
resetGameButton.addEventListener(`click`, resetGame)
// Mole Clicks
for (let i = 0; i < boardgameBoxes.length; i++) {
  boardgameBoxes[i].addEventListener(`click`, async () => {
    if (boardgameBoxesValues[i] === 1) {
      boardgameBoxesValues[i] = 2
      boardgameBoxes[i].style.backgroundColor = `green`
      scoreChange()

      await new Promise((resolve) => setTimeout(resolve, 500))
      setHole(i)
    }
  })
}
