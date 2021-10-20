/**
 * TODO:
 * -Add hover effect on buttons (bigger btn and small tooltip on top?)
 * -Add effect when winning/losing/draw round
 * -Add end of game screen + try again Button
 * -Add surprise
 * -Add effect when first opening app (?)
 * -Add traduction (??)
 */

const choices = ['Rock', 'Paper', 'Scissors'];
const PLAYER_SCORE_ID = 'player-score';
const COMPUTER_SCORE_ID = 'computer-score';


function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}


function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();
    let result = "";

    if (computerSelection === playerSelection) {
        result = `Round is null, both players chose ${computerSelection}`;
    }
    else if (
        (computerSelection === choices[0] && playerSelection === choices[2]) ||
        (computerSelection === choices[2] && playerSelection === choices[1]) ||
        (computerSelection === choices[1] && playerSelection === choices[0])) {
        result = `You lose! ${computerSelection} beats ${playerSelection}!`;
        updateScore(COMPUTER_SCORE_ID);

    } else {
        result = `You win! ${playerSelection} beats ${computerSelection}!`;
        updateScore(PLAYER_SCORE_ID);

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
    document.getElementById(PLAYER_SCORE_ID).innerHTML = 0;
    document.getElementById(COMPUTER_SCORE_ID).innerHTML = 0;
}

function getScore(scoreId) {
    return document.getElementById(scoreId).innerHTML;
}

//play 5 games against computer
function game() {

    //Removed 5 games limit
    // for (let i = 1; i <=5;i++){

    // }
    let playerSelection = prompt("Rock, Paper, Scissors?");
    console.log(playRound(playerSelection, computerPlay()));
}
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //alert(
        console.log(playRound(button.id, computerPlay()));
        if (getScore(COMPUTER_SCORE_ID) == 5 || getScore(PLAYER_SCORE_ID) == 5) {
            alert('winner winner chicken dinner');
            resetScores();
        }
    });
});


