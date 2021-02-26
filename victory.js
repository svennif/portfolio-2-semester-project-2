let winner = localStorage.getItem('winner');
let winnerToken = localStorage.getItem('winnerToken');

if (winner === 'playerOne') {
    winner = localStorage.getItem('playerOne');
    winnerToken = localStorage.getItem('playerOneImg');
} else if (winner === 'playerTwo') {
    winner = localStorage.getItem('playerTwo');
    winnerToken = localStorage.getItem('playerTwoImg');
}

let victoryContainer = document.querySelector('.victory-container');

victoryContainer.innerHTML = "<div class='d-flex flex-column'>" +
    "<div class='p-2 text-center victory-title'>Victory!</div>" +
    "<img class='p-2 text-center victory-img' src='" + winnerToken + "'>" +
    "<div class='p-12 victory-text'>" + winner + "</div>" +
    "</div>";

let homeButton = document.querySelector('.home-button');

homeButton.addEventListener('click', e => {
    localStorage.clear();
});

function buttonHome() {
    localStorage.clear();
    window.location.replace('index.html');
}