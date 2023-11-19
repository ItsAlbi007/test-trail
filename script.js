let playerText = document.getElementById('playerText')
let resetBtn = document.getElementById('resetBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winner

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winnings-blocks')
//console.log(boxes)

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

//console.log(spaces)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
  const id = e.target.id
  if(!spaces[id]){
      spaces[id] = currentPlayer
      e.target.innerText = currentPlayer
      if(playerHasWon() !== false){
        console.log(currentPlayer, 'is the winner')
        playerText.textContent = `${currentPlayer} has won!`
        let winning_blocks = playerHasWon()
        winning_blocks.map( box => boxes[box].style.backgroundColor = 'red')
        return 
        
        //console.log(winning_blocks)
      }
      currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT
  }
}

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

function playerHasWon(){
  for (const condition of winningCombos){
    let[a,b,c] = condition
    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a,b,c]
    }
    //console.log(spaces[a],spaces[b],spaces[c])
  
  }
  return false
}

resetBtn.addEventListener('click', reset)
function reset(){
  spaces.fill(null)
  boxes.forEach( box => {
    box.innerText = ''
    box.style.backgroundColor=''
  })
  playerText.textContent = 'Tic Tac Toe'
  currentPlayer = X_TEXT
}

startGame()