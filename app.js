/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


//setter
document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>';

//getter
var x = document.querySelector('#score-0').textContent;

//styling
document.querySelector('.dice').style.display = 'none';

//Die roll
dice = Math.floor(Math.random() * 6) + 1;

//Event handler
document.querySelector('.btn-roll').addEventListener('click', fnctn);
//document.querySelector('.btn-roll').addEventListener('click', function(){
//  1. Randome number
//  2. Display the result
//      document.querySelector('.dice').style.display = 'block';
//  3. Update the round score IF roll not 1
//  4. 
//});

//Select dice img
var diceDOM = document.querySelector('.dice');
diceDOM.style.display = 'block';
diceDOM.src = 'dice-'+dice+'.png';

//getElementById
document.getElementById('score-0').textContent = '0';
*/
/*activePlayer = {
    id: 0,

    currentScoreDom: document.getElementById('current-0'),
    scoreDom: document.getElementById('score-0'),

    switchPlayer: function () {
        this.id === 0 ? this.id = 1 : this.id = 0;
    }
}*/

var activePlayer = 0;
var scores = [0, 0];
var currentScore = 0;

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
        //document.getElementById('score-'+activePlayer).textContent += this.value;
    }
}

//document.querySelector('#current-' + activePlayer).textContent = dice.value;

function playerSwitch() {
    currentScore = 0;
    document.getElementById('current-'+activePlayer).textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');


}

function checkRoll() {
 
    if (dice.value === 1) {
        
        playerSwitch();
        return;
    }
    currentScore += dice.value;
}

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

    dice.hide();

}

function checkScore() {

    if (scores[activePlayer] >= 100) {
        //Active Player Won - Display Winner and Hide all
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('.btn-roll').style.display = 'none';
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('#name-' + activePlayer).textContent = 'Piggie!';
        return 1;
    }
    return 0;
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    dice.show();
    dice.roll();
    checkRoll();
    document.querySelector('#current-' + activePlayer).textContent = currentScore;
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    scores[activePlayer] += currentScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (checkScore()) {
        return;
    }
    
    playerSwitch();
})

document.querySelector('.btn-new').addEventListener('click', function () {
    clearBoard();
})

clearBoard();

