const playGameButton = document.getElementById(`playGameButton`)
const homeButton = document.getElementById(`homeButton`)

playGameButton.addEventListener(`click`, () => {
  document.location.href = `game.html`
})

homeButton.addEventListener(`click`, () => {
  document.location.href = `index.html`
})
