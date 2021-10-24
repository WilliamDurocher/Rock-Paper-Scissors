

const choices = ['Rock', 'Paper', 'Scissors'];
const player = 'player-score';
const computer = 'computer-score';
const infoBtn = document.getElementById('info-btn');
const gameButtons = document.getElementById('btn-container').querySelectorAll('.btn');

gameButtons.forEach((button) => {
    button.addEventListener('click', () => {

        playRound(button.id, computerPlay());

        //First to get to 5 wins
        if (getScore(computer) == 5) {
            showEndGame(computer);
        } else if (getScore(player) == 5) {
            showEndGame(player);
        }
    });
});

infoBtn.addEventListener('click', () => {
    hideGame();
    showInfo();
})



function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}

/*TODO: Redo the result animation(s) */
function flashLabelsColor(color) {
    let cpu = document.getElementById('computer-label');
    let player = document.getElementById('player-label');

    cpu.style.color = color;
    player.style.color = color;

    setTimeout(function () {
        cpu.style.color = "white";
        player.style.color = "white";

    }, 800);
}


function playRound(playerSelection, computerSelection) {

    if (computerSelection === playerSelection) {
        flashLabelsColor('yellow');
    }
    else if (
        (computerSelection === choices[0] && playerSelection === choices[2]) ||
        (computerSelection === choices[2] && playerSelection === choices[1]) ||
        (computerSelection === choices[1] && playerSelection === choices[0])) {

        updateScore(computer);
        flashLabelsColor('red');
    } else {
        updateScore(player);
        flashLabelsColor('green');
    }
}

function updateScore(scoreId) {
    let score = document.getElementById(scoreId);
    let number = score.innerHTML;
    number++;
    score.innerHTML = number;
}

function resetScores() {
    document.getElementById(player).innerHTML = 0;
    document.getElementById(computer).innerHTML = 0;
}

function getScore(scoreId) {
    return document.getElementById(scoreId).innerHTML;
}



function showEndGame(winner) {

    const endGameBtn = document.getElementById('endgame-btn');
    const endGameBtnText = document.getElementById('endgame-btn-text');
    const endGame = document.getElementById('endgame');

    hideGame();

    document.getElementById('endgame-container').style.display = 'flex';

    if (winner == computer) {
        endGame.innerText = "So close yet so far.";
        endGameBtnText.innerText = "try again";
        endGameBtnText.style.setProperty('--endgame-btn-icon', "url('../images/refresh.png')");
        endGameBtn.onclick = function () {
            restartGame();
        }
    } else if (winner == player) {
        endGame.innerText = "Congratulations! You beat me. Ready for the surprise?";
        endGameBtnText.innerText = "Show Surprise";
        endGameBtnText.style.setProperty('--endgame-btn-icon', "url('../images/dog-house.png')");
        endGameBtn.onclick = function () {
            showSurprise();
        }
    }
}

function restartGame() {
    document.getElementById('description-container').style.visibility = 'visible';
    document.getElementById('btn-container').style.visibility = 'visible';
    document.getElementById('score-container').style.visibility = 'visible';
    document.getElementById('score-label').style.visibility = 'visible';
    document.getElementById('endgame-container').style.display = 'none';
    resetScores();
}

function hideGame() {
    document.getElementById('description-container').style.visibility = 'hidden';
    document.getElementById('btn-container').style.visibility = 'hidden';
    document.getElementById('score-container').style.visibility = 'hidden';
    document.getElementById('score-label').style.visibility = 'hidden';
}

function showGame() {
    document.getElementById('description-container').style.visibility = 'visible';
    document.getElementById('btn-container').style.visibility = 'visible';
    document.getElementById('score-container').style.visibility = 'visible';
    document.getElementById('score-label').style.visibility = 'visible';
}

function showSurprise() {
    document.getElementById('surprise').style.display = 'inline-block';
    document.getElementById('endgame-btn-text').innerText = "Play again";
    document.getElementById('endgame-btn-text').style.setProperty('--endgame-btn-icon', "url('../images/smile.png')");
    document.getElementById('endgame').innerText = "TADAAAAAA!!!";

    document.getElementById('endgame-btn').onclick = function () {
        restartGame();
        document.getElementById('surprise').style.display = 'none';

    }
}

function showInfo() {
    document.getElementById('info-container').style.display = 'flex';

    const backBtn = document.getElementById('info-back-btn');

    backBtn.addEventListener('click', () => {
        backToGame();
    })

}

function hideInfo() {
    document.getElementById('info-container').style.display = 'none';
}

function backToGame() {
    hideInfo();
    showGame();
}