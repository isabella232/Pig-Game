/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

-EXTRA RULES
-Two 6's in a row lose the players ENTIRE SCORE
*/

//Global variables
var activePlayer = 0;
var scores = [0, 0];
var currentScore = 0;
var prevRoll = 0;

var dice = {
    value: 1,
    DOM: document.querySelector('.dice'),
    show: function () {
        this.DOM.style.display = 'block';
    },
    hide: function () {
        this.DOM.style.display = 'none';
    },
    roll: function () {
        this.value = Math.floor(Math.random() * 6) + 1;
        this.DOM.src = 'dice-' + this.value + '.png';
    }
}

//Switch Players - reset current score and toggle active panels
function playerSwitch() {
    currentScore = 0;
    document.getElementById('current-'+activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');


}

//Check if the roll is a 1 - switch players if 1
function checkRoll() {
 
    if (dice.value === 1) {
        
        playerSwitch();
        return;
    }
    if (dice.value === 6 && prevRoll === 6) {

        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = '0';
        playerSwitch();
        return;

    }

    prevRoll = dice.value;
    currentScore += dice.value;
}


//Clears the board to the default set up
function clearBoard() {
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
 
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-name-0').style.display = 'none';
    document.querySelector('.player-name-1').style.display = 'none';

    document.querySelector('.rules-panel').style.display = 'none';
    document.querySelector('.final-score').style.display = 'block';


    dice.hide();

}

//Check if there is a winner (returns true) - notify players and stop the game
function checkScore() {

    var finalScore = document.querySelector('.final-score').value;
    if (!finalScore) {
        finalScore = 100;
    }

    if (scores[activePlayer] >= finalScore) {
        //Active Player Won - Display Winner and Hide all
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.btn-roll').style.display = 'none';
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('#name-' + activePlayer).textContent = 'Piggie!';
        return true;
    }
    return false;
}

//On click of Roll - roll the die and check outcome
document.querySelector('.btn-roll').addEventListener('click', function () {
    //Make sure the die is visible
    dice.show();
    //Hide the final score block
    document.querySelector('.final-score').style.display = 'none';
    dice.roll();
    checkRoll();
    //Update the score
    document.querySelector('#current-' + activePlayer).textContent = currentScore;
})

//On click hold - save the player's score and check if they won, if not switch players
document.querySelector('.btn-hold').addEventListener('click', function () {
    scores[activePlayer] += currentScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (checkScore()) {
        //Finish the game loop if winner occurred
        return;
    }
    
    playerSwitch();
})

// On click rules
document.querySelector('.btn-rules').addEventListener('click', function () {
    //Show rules
    document.querySelector('.rules-panel').style.display = 'block';
})
// On click exit rules
document.querySelector('.btn-exit-rules').addEventListener('click', function () {
    //Hide rules
    document.querySelector('.rules-panel').style.display = 'none';
})

//On double click enter names
document.querySelector('#name-0').addEventListener('dblclick', function () {
    document.querySelector('.player-name-0').style.display = 'block';
    document.querySelector('.player-name-0').focus()
    document.querySelector('.player-name-0').addEventListener('blur', function () {
         
        var name0 = document.querySelector('.player-name-0').value;
        if (!name0) name0 = 'Player 1';

        document.querySelector('#name-0').textContent = name0;
        document.querySelector('.player-name-0').style.display = 'none';
    })
})
document.querySelector('#name-1').addEventListener('dblclick', function () {
    document.querySelector('.player-name-1').style.display = 'block';
    document.querySelector('.player-name-1').focus()
    document.querySelector('.player-name-1').addEventListener('blur', function () {
         
        var name1 = document.querySelector('.player-name-1').value;
        if (!name1) name1 = 'Player 2';

        document.querySelector('#name-1').textContent = name1;
        document.querySelector('.player-name-1').style.display = 'none';
    })
})

//On click new game - reset everything to default
document.querySelector('.btn-new').addEventListener('click', clearBoard);

//Initialise with defaults
clearBoard();

