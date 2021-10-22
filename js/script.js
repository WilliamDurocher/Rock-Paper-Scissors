/**
 * TODO:
 * -Add surprise
 * -Add info screen
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
        flashLabelsColor('yellow');      
    }
    else if (
        (computerSelection === choices[0] && playerSelection === choices[2]) ||
        (computerSelection === choices[2] && playerSelection === choices[1]) ||
        (computerSelection === choices[1] && playerSelection === choices[0])) {
        result = `You lose! ${computerSelection} beats ${playerSelection}!`;
        updateScore(COMPUTER_SCORE_ID);
        flashLabelsColor('red');
    } else {
        result = `You win! ${playerSelection} beats ${computerSelection}!`;
        updateScore(PLAYER_SCORE_ID);
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
    document.getElementById(PLAYER_SCORE_ID).innerHTML = 0;
    document.getElementById(COMPUTER_SCORE_ID).innerHTML = 0;
}

function getScore(scoreId) {
    return document.getElementById(scoreId).innerHTML;
}

function flashLabelsColor(color){
    let cpu = document.getElementById('computer-label');
    let player = document.getElementById('player-label');

    cpu.style.color = color;
    player.style.color = color;

    setTimeout(function() { 
        cpu.style.color = "white"; 
        player.style.color = "white"; 

    }, 800);
}

//play 5 games against computer
function game() {

    //Removed 5 games limit
    // for (let i = 1; i <=5;i++){

    // }
    let playerSelection = prompt("Rock, Paper, Scissors?");
    console.log(playRound(playerSelection, computerPlay()));
}
const buttons = document.getElementById('btn-container').querySelectorAll('.btn');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //alert(
        console.log(playRound(button.id, computerPlay()));
        if (getScore(COMPUTER_SCORE_ID) == 5){
            showEndGame(COMPUTER_SCORE_ID);
        }else if(getScore(PLAYER_SCORE_ID) == 5) {
            showEndGame(PLAYER_SCORE_ID);
            resetScores();
        }
    });
});

const tryAgainbtn = document.getElementById('endgame-btn');

tryAgainbtn.addEventListener('click', () =>{
    restartGame();
})

function showEndGame(){
hideGame();
document.getElementById('endgame').innerText = "You lost the game dawg";
document.getElementById('endgame-btn').innerText = "try again";



}

function hideGame(){
    document.getElementById('description-container').style.visibility = 'hidden';
    document.getElementById('btn-container').style.visibility = 'hidden';
    document.getElementById('score-container').style.visibility = 'hidden';
    document.getElementById('score-label').style.visibility = 'hidden';
    document.getElementById('endgame-container').style.display = 'flex';
    
}

function restartGame(){
    document.getElementById('description-container').style.visibility = 'visible';
    document.getElementById('btn-container').style.visibility = 'visible';
    document.getElementById('score-container').style.visibility = 'visible';
    document.getElementById('score-label').style.visibility = 'visible';
    document.getElementById('endgame-container').style.display = 'none';

    resetScores();
}