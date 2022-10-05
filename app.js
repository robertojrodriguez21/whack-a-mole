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
const boardgameBoxesValues = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

// Document Selectors
const boardgameBoxes = document.querySelectorAll(`.boardgameBox`)
const startGameButton = document.getElementById(`startGameButton`)
const resetGameButton = document.getElementById(`resetGameButton`)

// Functions
// Start Game
const startGame = async () => {
  while (gameStarted) {
    while (gameTimer > 0) {
      let tempIndex = setMole()
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(`${boardgameBoxesValues}`)
      console.log(tempIndex)
      console.log(score)
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
    boardgameBoxes[i].style.backgroundColor = `black`
    boardgameBoxesValues[i] = 0
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
for (let i = 0; i < boardgameBoxes.length; i++) {
  boardgameBoxes[i].addEventListener(`click`, async () => {
    if (boardgameBoxesValues[i] === 1) {
      boardgameBoxes[i].style.backgroundColor = `green`
      score += 1000

      await new Promise((resolve) => setTimeout(resolve, 500))
      setHole(i)
    }
  })
}
// Mole Disappears
// for (let i = 0; i < boardgameBoxes.length; i++) {
//   boardgameBoxes[i].addEventListener('change', async () => {
//     await new Promise((resolve) => setTimeout(resolve, 500))
//     boardgameBoxes[i].style.backgroundColor = `black`
//     boardgameBoxesValues[i] = 0
//   })
// }

// Style Change Observer
// Select the node that will be observed for mutations
// let targetNode

// // Options for the observer (which mutations to observe)
// const config = { attributes: true, attributesFilter: [`style`] }

// // Callback function to execute when mutations are observed
// const callback = (mutationList, observer, boardgameBoxIndex) => {
//   for (const mutation of mutationList) {
//     if (mutation.type === 'attributes') {
//       console.log(
//         `The ${mutation.attributeName} attribute was modified at box ${boardgameBoxIndex}.`
//       )
//     }
//   }
// }

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback)

// // Start observing the target node for configured mutations
// for (let i = 0; i < boardgameBoxes.length; i++) {
//   targetNode = boardgameBoxes[i]
//   observer.observe(targetNode, config, i)
// }
