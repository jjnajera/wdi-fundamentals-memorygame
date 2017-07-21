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
var newGameButton = document.getElementsByTagName('button')[0];
var message = document.getElementById('message');
var highScore = 0;
var matchFound = 0;
var totalScore = 0;

var checkForMatch = function(){

  if(cardsInPlay[0].rank === cardsInPlay[1].rank){
    matchFound += 2;
    totalScore += 10;

    document.getElementById('matchFound').textContent = "Matches Found: "+matchFound;
    document.getElementById('totalScore').textContent = "Total Score: "+totalScore;

    message.textContent = "match found";
    message.style.color = "green";
  }
  else{
    totalScore -=5;
    document.getElementById('totalScore').textContent = "Total Score: "+totalScore;

    message.textContent = "try again";
    message.style.color = "red";
  }

  if(totalScore > highScore){
    highScore = totalScore;
    document.getElementById('highScore').textContent = "Hi-Score: "+highScore;
  }

  message.removeAttribute('hidden','');

  setTimeout(resetGame, 400);
};

var flipCard = function(){
  var cardId = this.getAttribute('data-id');
  this.setAttribute('src',cards[cardId].cardImage);

  cardsInPlay.push(cards[cardId]);

  if(cardsInPlay.length === 2){
    setTimeout(checkForMatch,100);
  }

  this.removeEventListener('click', flipCard);
};

var createGameBoard = function(){

  newGameButton.addEventListener('click', newGame);

  cards.sort(function(){return 0.5-Math.random()});

  for(var i = 0;i < cards.length; i++){
    var newImage = document.createElement('img');
    newImage.setAttribute('src','images/back.png');
    newImage.setAttribute('data-id',i);

    newImage.addEventListener('click',flipCard);

    document.getElementById('game-board').appendChild(newImage);
  }
};

var newGame = function(){
  matchFound = 0;
  totalScore = 0;

  resetGame();

  document.getElementById("matchFound").innerHTML = "Matches Found: " + matchFound;
  document.getElementById("totalScore").innerHTML = "Total Score: " + totalScore;
}

var resetGame = function(){
  message.setAttribute('hidden','');

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
