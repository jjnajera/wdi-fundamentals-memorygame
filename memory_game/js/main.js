var cards = [
  {
    rank: 'queen',
    suit: 'hearts',
    cardImage: 'images/queen-of-hearts.jpg'
  },
  {
    rank: 'queen',
    suit: 'diamonds',
    cardImage: 'images/queen-of-diamonds.jpg'
  },
  {
    rank: 'king',
    suit: 'hearts',
    cardImage: 'images/king-of-hearts.jpg'
  },
  {
    rank: 'king',
    suit: 'diamonds',
    cardImage: 'images/king-of-diamonds.jpg'
  }
];
var cardsInPlay = [];

var checkForMatch = function(){
  if(cardsInPlay[0] === cardsInPlay[1]){
    alert("You found a match!");
  }
  else{
    alert("Sorry, try again.");
  }
};

var flipCard = function(){
  var cardId = this.getAttribute('data-id');
  this.setAttribute('src',cards[cardId].cardImage);

  cardsInPlay.push(cards[cardId]);

  if(cardsInPlay.length === 2){
    checkForMatch();
  }
};

var createGameBoard = function(){
  for(var i = 0;i < cards.length; i++){
    var newImage = document.createElement('img');
    newImage.setAttribute('src','images/back.png');
    newImage.setAttribute('data-id',i);

    newImage.addEventListener('click',flipCard);

    document.getElementById('game-board').appendChild(newImage);
  }
};

createGameBoard();
