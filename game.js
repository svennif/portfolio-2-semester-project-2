// meta code
const board = [
  {id: 1, left: 0, top: 100},
  {id: 2,left: 100, top: 100},
  {id: 3,left: 200, top: 100},
  {id: 4,left: 300, top: 100},
  {id: 5,left: 400, top: 100},
  
  {id: 6,left: 0, top: 200},
  {id: 7,left: 100, top: 200},
  {id: 8,left: 200, top: 200},
  {id: 9,left: 300, top: 200},
  {id: 10,left: 400, top: 200},
  
  {id: 11,left: 0, top: 300},
  {id: 12,left: 100, top: 300},
  {id: 13,left: 200, top: 300},
  {id: 14,left: 300, top: 300},
  {id: 15,left: 400, top: 300},
  
  {id: 16,left: 0, top: 400},
  {id: 17,left: 100, top: 400},
  {id: 18,left: 200, top: 400},
  {id: 19,left: 300, top: 400},
  {id: 20,left: 400, top: 400},
  
  {id: 21,left: 0, top: 500},
  {id: 22,left: 100, top: 500},
  {id: 23,left: 200, top: 500},
  {id: 24,left: 300, top: 500},
  {id: 25,left: 400, top: 500},
  
  {id: 26,left: 0, top: 600},
  {id: 27,left: 100, top: 600},
  {id: 28,left: 200, top: 600},
  {id: 29,left: 300, top: 600},
  {id: 30,left: 400, top: 600},
]

var rollHistoryOne = [];
var rollHistoryTwo = [];
var playerOnePos = 0; // Player one starting position
var playerTwoPos = 0; // Player Two starting position

// show roll history
const el = document.getElementById('logOne');
const le = document.getElementById('logTwo');
document.getElementById('playerOne').innerHTML = "<strong>" + localStorage.getItem('playerOne') + "</strong>";
document.getElementById('playerTwo').innerHTML = "<strong>" + localStorage.getItem('playerTwo') + "</strong>";

function updateHistoryOne(rollOne) {
  rollHistoryOne.push(rollOne);
  el.innerHTML = '';
  rollHistoryOne.forEach((record, i) => {
    const playerOneLog = document.createElement('div');
    playerOneLog.className = 'playerOneLog';
    playerOneLog.innerHTML = `<strong>${(i + 1)}:</strong> ${record}`;
    el.append(playerOneLog);
  });
}

function updateHistoryTwo(rollTwo) {
  rollHistoryTwo.push(rollTwo);
  le.innerHTML = '';
  rollHistoryTwo.forEach((record, i) => {
    const playerTwoLog = document.createElement('div');
    playerTwoLog.className = 'playerTwoLog';
    playerTwoLog.innerHTML = `<strong>${(i + 1)}:</strong> ${record}`;
    le.append(playerTwoLog);
  });
}

// draw board
const tileContainer = document.getElementById('tileContainer');

board.forEach(tile => {
  const tileDiv = document.createElement('div');
  tileDiv.className = 'tile';
  tileDiv.style.left = tile.left + 'px';
  tileDiv.style.top = tile.top + 'px';
  tileContainer.appendChild(tileDiv);
});

// Dice
function diceOne() {
  return Math.floor(Math.random() * 6 + 1);
}

function diceTwo() {
  return Math.floor(Math.random() * 6 + 1);
}

// button and position logic
const button = document.getElementById('rollButton');

// Token image

const tokenOneContainer = document.getElementById('tokenOne');
const tokenTwoContainer = document.getElementById('tokenTwo');

let playerOneToken = tokenOneContainer.getContext('2d');

let tokenOne = new Image();
tokenOne.onload = function() {
  playerOneToken.drawImage(tokenOne, 0 , 0);
}

tokenOne.src = localStorage.getItem('playerOneImg');

let playerTwoToken = tokenTwoContainer.getContext('2d');

let tokenTwo = new Image();
tokenTwo.onload = function() {
  playerTwoToken.drawImage(tokenTwo, 0 , 0);
}

tokenTwo.src = localStorage.getItem('playerTwoImg');

button.addEventListener('click', (e) => {
  const rollOne = diceOne();
  const rollTwo = diceTwo();
  updateHistoryOne(rollOne);
  updateHistoryTwo(rollTwo);

  if (playerOnePos + rollOne >= board.length) {
    // not enought tiles left, go to last
    playerOnePos = board.length - 1;
  } else {
    playerOnePos += rollOne;
  }

  if (playerTwoPos + rollTwo >= board.length) {
    // not enought tiles left, go to last
    playerTwoPos = board.length - 1;
  } else {
    playerTwoPos += rollTwo;
  }

  tokenOneContainer.style.left = board[playerOnePos].left + 35 + 'px';
  tokenOneContainer.style.top = board[playerOnePos].top + 35 + 'px';
  tokenTwoContainer.style.left = board[playerTwoPos].left + 35 + 'px';
  tokenTwoContainer.style.top = board[playerTwoPos].top + 35 + 'px';

  function tokenOnePosition() {
    tokenOneContainer.style.left = board[playerOnePos].left + 35 + 'px';
    tokenOneContainer.style.top = board[playerOnePos].top + 35 + 'px';
  }

  function tokenTwoPosition() {
    tokenTwoContainer.style.left = board[playerTwoPos].left + 35 + 'px';
    tokenTwoContainer.style.top = board[playerTwoPos].top + 35 + 'px';
  }

  if (playerOnePos === 7) {
    alert('Hodor did not hold the door, go back 5 steps');
    playerOnePos = 2;
    tokenOnePosition();
  } else if (playerOnePos === 10) {
    alert("Deanery's dragon is having a nap in the road, go back 2 steps");
    playerOnePos = 8;
    tokenOnePosition();
  } else if (playerOnePos === 13) {
    alert('House of Lannister have knocked over a tree, go back 3 steps');
    playerOnePos = 10;
    tokenOnePosition();
  } else if (playerOnePos === 20) {
    alert('Bryan Stark is running you over, go back 5 steps');
    playerOnePos = 15;
    tokenOnePosition();
  } else if (playerOnePos === 27) {
    alert('The Three-Eyed Raven is judging you from afar, go back 4 steps');
    playerOnePos = 23;
    tokenOnePosition();
  };

  if (playerTwoPos === 7) {
    alert('Hodor did not hold the door, go back 5 steps');
    playerTwoPos = 6;
    tokenTwoPosition();
  } else if (playerTwoPos === 10) {
    alert("Deanery's dragon is having a nap in the road, go back 2 steps");
    playerTwoPos = 8;
    tokenTwoPosition();
  } else if (playerTwoPos === 13) {
    alert('House of Lannister have knocked over a tree, go back 3 steps');
    playerTwoPos = 10;
    tokenTwoPosition();
  } else if (playerTwoPos === 20) {
    alert('Bryan Stark is running you over, go back 5 steps');
    7
    playerTwoPos = 15;
    tokenTwoPosition();
  } else if (playerTwoPos === 27) {
    alert('The Three-Eyed Raven is judging you from afar, go back 4 steps');
    playerTwoPos = 23;
    tokenTwoPosition();
  };

  function victory(winner, winnerToken){
    localStorage.setItem('winner', winner);
    localStorage.setItem('winnerToken', winnerToken);
  }

  // if on last, WIN!
  if (playerOnePos === board.length - 1) {
    alert(localStorage.getItem('playerOne') + ' is victorious!');
    victory('playerOne', 'playerOneImg');
    window.location.replace('victory.html');
  } else if (playerTwoPos === board.length - 1) {
    alert(localStorage.getItem('playerTwo') + ' is victorious!');
    victory('playerTwo', 'playerOneImg');
    window.location.replace('victory.html');
  }
});

let homeButton = document.querySelector('.home-button');

homeButton.addEventListener('click', e => {
    localStorage.clear();
});