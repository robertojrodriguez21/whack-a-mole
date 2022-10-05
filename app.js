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
removeMole = async (boxIndex) => {
  if (boardgameBoxesValues[boxIndex] === 1) {
    boardgameBoxesValues[boxIndex] = 2
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
  for (let i = 0; i < boardgameBoxes.length; i++) {
    setHole(i)
  }
}

const resetGame = () => {
  resetBoard()
  highScore = 0
  score = 0
  highScoreText.innerHTML = highScore
  scoreText.innerHTML = score
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
  if (!gameStarted) {
    gameStarted = true
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
      boardgameBoxes[i].style.backgroundColor = `green`
      scoreChange()

      await new Promise((resolve) => setTimeout(resolve, 500))
      setHole(i)
    }
  })
}
