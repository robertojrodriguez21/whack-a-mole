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
const gameboardBoxesValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

const gameboardBoxes = document.querySelectorAll(`.gameboardBox`)
const startGameButton = document.getElementById(`startGameButton`)

// Functions
const startGame = () => {
  for (let i = 0; i < gameboardBoxes.length; i++) {
    gameboardBoxes[i].addEventListener(`click`, () => {
      if (gameboardBoxes[i] === 1) {
        gameboardBoxes[i].style.backgroundColor = `black`
      }
    })
  }

  while (gameTimer !== 0) {
    randomIndex = Math.floor(Math.random() * 25)
    while (gameboardBoxes[randomIndex] === 1) {
      randomIndex = Math.floor(Math.random() * 25)
    }
    gameboardBoxesValues[randomIndex] = 1
    gameboardBoxes[randomIndex].style.backgroundColor = `yellow`
    setInterval(2000)
    gameTimer--
  }
}

// Logic
startGameButton.addEventListener('click', startGame)

for (let i = 0; i < gameboardBoxes.length; i++) {
  gameboardBoxes[i].addEventListener(`click`, () => {
    gameboardBoxes[i].style.backgroundColor = `yellow`
  })
}
