// creating cards
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
const deck = document.querySelector(".deck");
let openCards = [];
let matchCards = [];
const timeCounter = document.querySelector('.timer');
let timerStarted = false;
let time = 0;
let close = document.querySelector('.close');

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// first function creating cards:

function startGame() {
  shuffle(icons);
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    deck.appendChild(card);
    clickCard(card);
  }
}
//add click event to cards
function clickCard(card) {
  card.addEventListener("click", function() {
    const secondCard = this;
    const firstCard = openCards[0];

    if (openCards.length === 1) {
      card.classList.add("open", "show", "unclickable");
      openCards.push(this);
      // call function that check the match
      isItMatch(secondCard, firstCard);
    } else {
      card.classList.add("open", "show", "unclickable");
      openCards.push(this);
      if (timerStarted === false) {
        startTimer()
      }


    }

  });
}
// add funtion which compares open cards
function isItMatch(secondCard, firstCard) {
  // when two cards are open count move
  moveCounter();
  if (secondCard.innerHTML === firstCard.innerHTML) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    matchCards.push(secondCard, firstCard);
    openCards = [];
    // call function that check if game is over
    isOver();
  } else {
    setTimeout(function() {
      firstCard.classList.remove("open", "show", "unclickable");
      secondCard.classList.remove("open", "show", "unclickable");
    }, 500);
    openCards = [];

  }
}
// function that checks if the game is finished
function isOver() {
  if (matchCards.length === icons.length) {
    result();
    clearInterval(timer);
    modal.style.display = 'block';

  }
}
// add move counter to game
let moves = 0;
const movesSpan = document.querySelector(".moves");

function moveCounter() {
  moves++;
  movesSpan.innerHTML = moves;
  starRate();
}

// stars rating
const stars = document.querySelector(".stars");
let firstStar = document.querySelector(".first");
let secondStar = document.querySelector(".second");
let thirdStar = document.querySelector(".third");
let starsNum = 3;

function starRate() {
  if (moves <= 8) {
    starsNum = 3
  }
  if (moves > 8) {
    firstStar.classList.add("starInvisible");
    starsNum = 2;
  }
  if (moves > 16 && moves < 24) {
    secondStar.classList.add("starInvisible");
    starsNum = 1;
  }
  if (moves >= 24) {
    thirdStar.classList.add("starInvisible");
    starsNum = 0;
  }
}
// timer
let timer;

function startTimer() {
  timerStarted = true;
  timer = setInterval(timeCount, 1000);

  function timeCount() {
    time = time + 1;
    timeCounter.innerHTML = time + 's';

  }
}
// result for popup modal
const congrats = document.querySelector(".modalContent");
const modal = document.getElementById('congratModal')
const newP = document.createElement("p");

function result() {
  newP.textContent = `Bravo! You collect ${starsNum} star(s)
  and it took You ${time} seconds to finished the game!`;
  congrats.appendChild(newP);
}

close.addEventListener("click", function() {
  modal.style.display = 'none';
})




// reset game

const restart = document.querySelector(".restart");
restart.addEventListener("click", function() {
  // delete old cards
  deck.innerHTML = "";
  stars.innerHTML = `<li><i class="first fa fa-star"></i></li>
<li><i class="second fa fa-star"></i></li>
<li><i class="third fa fa-star"></i></li>`;

  // create new cards
  startGame();
  //  reset everything
  matchCards = [];
  openCards = [];
  moves = 0;
  movesSpan.innerHTML = moves;
  timerStarted = false;
  clearInterval(timer);
  time = 0;
  timeCounter.innerHTML = time + 's';
  modal.style.display = 'none';

});

// call funtion to start the game for first time
startGame();
