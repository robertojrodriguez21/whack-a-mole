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

// Game Logic
// Variables
let gameOver = false

while (!gameOver) {}
