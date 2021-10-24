/**
 * TODO:
 * -Add info screen
 * -Add effect when first opening app (?)
 * -Add traduction (??)
 */

const choices = ['Rock', 'Paper', 'Scissors'];
const player = 'player-score';
const computer = 'computer-score';

const buttons = document.getElementById('btn-container').querySelectorAll('.btn');


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //alert(
        console.log(playRound(button.id, computerPlay()));
        if (getScore(computer) == 5) {
            showEndGame(computer);
        } else if (getScore(player) == 5) {
            showEndGame(player);
        }
    });
});


function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}


function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();
    let result = "";

    if (computerSelection === playerSelection) {
        result = `Round is null, both players chose ${computerSelection}`;
        flashLabelsColor('yellow');
    }
    else if (
        (computerSelection === choices[0] && playerSelection === choices[2]) ||
        (computerSelection === choices[2] && playerSelection === choices[1]) ||
        (computerSelection === choices[1] && playerSelection === choices[0])) {
        result = `You lose! ${computerSelection} beats ${playerSelection}!`;
        updateScore(computer);
        flashLabelsColor('red');
    } else {
        result = `You win! ${playerSelection} beats ${computerSelection}!`;
        updateScore(player);
        flashLabelsColor('green');
    }
    return result;
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

function showEndGame(winner) {

    const endGameBtn = document.getElementById('endgame-btn');

    hideGame();

    if (winner == computer) {
        document.getElementById('endgame').innerText = "You lost the game dawg";
        document.getElementById('endgame-btn-text').innerText = "try again";
        document.getElementById('endgame-btn-text').style.setProperty('--endgame-btn-icon', "url('../images/refresh.png')");
        endGameBtn.onclick = function(){
            restartGame();
        }
    } else if (winner == player){
        document.getElementById('endgame').innerText = "Congratulations! You beat me. Ready for the surprise?";
        document.getElementById('endgame-btn-text').innerText = "Show Surprise";
        document.getElementById('endgame-btn-text').style.setProperty('--endgame-btn-icon', "url('../images/dog-house.png')");
        endGameBtn.onclick = function(){
            showSurprise();
        }

    }

}

function hideGame() {
    document.getElementById('description-container').style.visibility = 'hidden';
    document.getElementById('btn-container').style.visibility = 'hidden';
    document.getElementById('score-container').style.visibility = 'hidden';
    document.getElementById('score-label').style.visibility = 'hidden';
    document.getElementById('endgame-container').style.display = 'flex';

}

function restartGame() {
    document.getElementById('description-container').style.visibility = 'visible';
    document.getElementById('btn-container').style.visibility = 'visible';
    document.getElementById('score-container').style.visibility = 'visible';
    document.getElementById('score-label').style.visibility = 'visible';
    document.getElementById('endgame-container').style.display = 'none';
    resetScores();
}

function showSurprise(){
    document.getElementById('surprise').style.display = 'inline-block';
    document.getElementById('endgame-btn-text').innerText = "Play again";
    document.getElementById('endgame-btn-text').style.setProperty('--endgame-btn-icon', "url('../images/smile.png')");
    document.getElementById('endgame').innerText = "TADAAAAAA!!!";

    document.getElementById('endgame-btn').onclick =  function(){
        restartGame();
        document.getElementById('surprise').style.display = 'none';

    }

    
    
}