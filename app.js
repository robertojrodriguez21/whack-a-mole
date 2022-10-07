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
  // 0=Hole, 1=Mole, 2=Hit, 3=Miss
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]
// Image URLs
const holeImage = `images/hole.png`
const moleImage = `images/mole.png`
const moleHitImage = `images/moleHit.png`
const moleEscapeImage = `images/moleEscape.png`
// Document Selectors
const boardgameBoxes = document.querySelectorAll(`.boardgameBox`)
const startGameButton = document.getElementById(`startGameButton`)
const resetGameButton = document.getElementById(`resetGameButton`)
const startOverButton = document.getElementById(`startOverButton`)
const scoreText = document.getElementById(`scoreText`)
const highScoreText = document.getElementById(`highScoreText`)
const asides = document.querySelectorAll(`aside`)

// Functions
// Start Game
const startGame = async () => {
  score = 0
  announce(`start`)
  await new Promise((resolve) => setTimeout(resolve, 3000))
  while (gameStarted) {
    while (gameTimer > 0) {
      let tempIndex = setMole()
      await new Promise((resolve) =>
        setTimeout(resolve, setTimeoutLength(500, 1000))
      )
      let tempIndexTwo = setMole()
      await new Promise((resolve) =>
        setTimeout(resolve, setTimeoutLength(1000, 2000))
      )
      removeMole(tempIndex)
      removeMole(tempIndexTwo)

      gameTimer--
    }
    gameStarted = false
  }
  announce(`end`)
}

// Game Start and Game Over Announcer
const announce = async (announceType) => {
  if (announceType === `start`) {
    for (let i = 0; i < asides.length; i++) {
      asides[i].innerHTML = `<div id=\`announcer\`>3</div>`
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    for (let i = 0; i < asides.length; i++) {
      asides[i].innerHTML = `<div id=\`announcer\`>2</div>`
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    for (let i = 0; i < asides.length; i++) {
      asides[i].innerHTML = `<div id=\`announcer\`>1</div>`
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    for (let i = 0; i < asides.length; i++) {
      asides[i].innerHTML = `<div id=\`announcer\`>GO</div>`
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    for (let i = 0; i < asides.length; i++) {
      asides[i].innerHTML = ``
    }
  } else {
    for (let i = 0; i < asides.length; i++) {
      asides[i].innerHTML = `<div id=\`announcer\`>GAME OVER</div>`
    }
  }
}

// Sets Mole on Board
const setMole = () => {
  randomIndex = Math.floor(Math.random() * boardgameBoxes.length)
  while (boardgameBoxesValues[randomIndex] === 1) {
    randomIndex = Math.floor(Math.random() * boardgameBoxes.length)
  }

  boardgameBoxes[randomIndex].innerHTML = `<img src=${moleImage}>`
  boardgameBoxesValues[randomIndex] = 1

  return randomIndex
}

// Removes Mole from Board
const removeMole = async (boxIndex) => {
  if (boardgameBoxesValues[boxIndex] === 1) {
    boardgameBoxesValues[boxIndex] = 3
    boardgameBoxes[boxIndex].innerHTML = `<img src=${moleEscapeImage}>`
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHole(boxIndex)
  }
}

// Sets Hole on Board
const setHole = (box) => {
  boardgameBoxes[box].innerHTML = `<img src=${holeImage}>`
  boardgameBoxesValues[box] = 0
}

// Reset Board
const resetBoard = () => {
  gameStarted = false
  gameTimer = 0
  clearBoard()
}

// Resets Board and Scores
const resetGame = () => {
  resetBoard()
  highScore = 0
  score = 0
  highScoreText.innerHTML = highScore
  scoreText.innerHTML = score
  for (let i = 0; i < asides.length; i++) {
    asides[i].innerHTML = ``
  }
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

// Gets Random Number for Timeout Length
const setTimeoutLength = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Game Logic
// Start Game
startGameButton.addEventListener(`click`, () => {
  if (!gameStarted) {
    clearBoard()
    gameStarted = true
    gameTimer = 10
    startGame()
  }
})
// Start Game Over (Reset Board)
startOverButton.addEventListener(`click`, () => {
  resetBoard()
  if (gameStarted) {
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
      boardgameBoxesValues[i] = 2
      boardgameBoxes[i].innerHTML = `<img src=${moleHitImage}>`
      scoreChange()

      await new Promise((resolve) => setTimeout(resolve, 500))
      setHole(i)
    }
  })
}
clearBoard()
