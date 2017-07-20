var cards = [
  {
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.png'
  },
  {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.png'
  },
  {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.png'
  },
  {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.png'
  }
];
var cardsInPlay = [];
var resetButton = document.getElementsByTagName('button')[0];
var matchScore = 0;
var nonMatchScore = 0;

var checkForMatch = function(){
  if(cardsInPlay[0] === cardsInPlay[1]){
    matchScore += 2;
    var temp = document.getElementById('matchScore').textContent = "Match Score: "+matchScore;
    alert("You found a match!");
  }
  else{
    nonMatchScore += 2;
    var temp = document.getElementById('nonMatchScore').textContent = "Non-match Score: "+nonMatchScore;
    alert("Sorry, try again.");
  }
};

var flipCard = function(){
  if(resetButton.getAttribute('disabled')){
    resetButton.removeAttribute('disabled');
    resetButton.style.backgroundColor= "#00FF00";
    resetButton.style.color = "black";
  }

  var cardId = this.getAttribute('data-id');
  this.setAttribute('src',cards[cardId].cardImage);

  cardsInPlay.push(cards[cardId].rank);

  if(cardsInPlay.length === 2){
    setTimeout(checkForMatch,100);
  }
};

var createGameBoard = function(){

  resetButton.addEventListener('click', resetGame);

  cards.sort(function(){return 0.5-Math.random()});

  for(var i = 0;i < cards.length; i++){
    var newImage = document.createElement('img');
    newImage.setAttribute('src','images/back.png');
    newImage.setAttribute('data-id',i);

    newImage.addEventListener('click',flipCard);

    document.getElementById('game-board').appendChild(newImage);
  }
};

var resetGame = function(){
  resetButton.setAttribute('disabled',true);
  resetButton.style.backgroundColor = "red";
  resetButton.style.color = "white";

  var parent = document.getElementById('game-board');
  var images = document.getElementsByTagName('img');
  for(var i = images.length-1; i >= 0; i--){
    parent.removeChild(images[i]);
  }

  while(cardsInPlay.length != 0){
    cardsInPlay.pop();
  }

  createGameBoard();
};

createGameBoard();
