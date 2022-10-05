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
const gameboardBoxesValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

// Document Selectors
const gameboardBoxes = document.querySelectorAll(`.gameboardBox`)
const startGameButton = document.getElementById(`startGameButton`)
const resetGameButton = document.getElementById(`resetGameButton`)

// Functions
// Start Game
const startGame = async () => {
  while (gameStarted) {
    while (gameTimer > 0) {
      setMole()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`${gameboardBoxesValues}`)
      gameTimer--
    }
    gameStarted = false
  }
}

// Mole Pop-Up
const setMole = () => {
  randomIndex = Math.floor(Math.random() * gameboardBoxes.length)
  while (gameboardBoxesValues[randomIndex] === 1) {
    randomIndex = Math.floor(Math.random() * gameboardBoxes.length)
  }

  gameboardBoxes[randomIndex].style.backgroundColor = `brown`
  gameboardBoxesValues[randomIndex] = 1
}

// Remove Mole and Set Hole
const setHole = (box) => {
  gameboardBoxes[box].style.backgroundColor = `black`
  gameboardBoxesValues[box] = 0
}

// Reset Board and Score
const resetBoard = () => {
  gameStarted = false
  gameTimer = 0
  for (let i = 0; i < gameboardBoxes.length; i++) {
    gameboardBoxes[i].style.backgroundColor = `black`
    gameboardBoxesValues[i] = 0
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
// Reset Game (Score and Board)
resetGameButton.addEventListener(`click`, resetBoard)
// Mole Clicks
for (let i = 0; i < gameboardBoxes.length; i++) {
  gameboardBoxes[i].addEventListener(`click`, async () => {
    if (gameboardBoxesValues[i] === 1) {
      gameboardBoxes[i].style.backgroundColor = `green`
      await new Promise((resolve) => setTimeout(resolve, 500))
      setHole(i)
    }
  })
}
