
const choices = ['Rock', 'Paper', 'Scissors'];

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
        }else{
            result = `You win! ${playerSelection} beats ${computerSelection}!`;
        }
    return result;
}

//play 5 games against computer
function game(){

    for (let i = 1; i <=5;i++){
        let playerSelection = prompt("Rock, Paper, Scissors?");
        console.log(playRound(playerSelection, computerPlay()));
    }
}

game();