// Page Select
const playGameButton = document.getElementById(`playGameButton`)
const homeButton = document.getElementById(`homeButton`)

if (playGameButton) {
  playGameButton.addEventListener(`click`, () => {
    window.location.href = `game.html`
    console.log(`click`)
  })
}

if (homeButton) {
  homeButton.addEventListener(`click`, () => {
    window.location.href = `index.html`
    console.log(`click`)
  })
}

// Game
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

// Functions
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const startGame = async () => {
  if (!gameStarted) {
    startGameButton.disabled = true
    gameStarted = true

    cleanBoard()

    for (let i = 0; i < gameboardBoxes.length; i++) {
      gameboardBoxes[i].addEventListener(`click`, () => {
        if (gameboardBoxesValues[i] === 1 || gameboardBoxesValues[i] === 2) {
          gameboardBoxes[i].style.backgroundColor = `yellow`
          setTimeout(() => {
            setHole(i)
          }, `500`)
        }
      })
    }

    while (gameTimer !== 0) {
      randomIndex = Math.floor(Math.random() * 25)
      while (gameboardBoxes[randomIndex] === 1) {
        randomIndex = Math.floor(Math.random() * 25)
      }

      gameboardBoxesValues[randomIndex] = 1
      gameboardBoxes[randomIndex].style.backgroundColor = `brown`
      await sleep(1000)

      gameTimer--
    }
  }
}

const cleanBoard = () => {
  for (let i = 0; i < gameboardBoxesValues.length; i++) {
    gameboardBoxes[i].style.backgroundColor = `black`
    gameboardBoxesValues[i] = 0
    gameTimer = 10
    gameStarted = false
    startGameButton.disabled = true
  }
}

const setHole = (gameboardBox) => {
  gameboardBoxes[gameboardBox].style.backgroundColor = `black`
  gameboardBoxesValues[gameboardBox] = 0
}

// Logic
startGameButton.addEventListener('click', startGame)
