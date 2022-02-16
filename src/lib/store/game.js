// Cardsymbol switch
function cardSymbol(card) {
    switch (card.suit) {
      case 'CLUBS':
        return '♣️';
      case 'SPADES':
        return '♠️';
      case 'DIAMONDS':
        return '♦️';
      case 'HEARTS':
        return '♥️';
      default:
        break;
    }
  }
  
  function validateGuess(card, nextGuess) {
      const colors = {
          'SPADES': 'black',
          'HEARTS': 'red',
          'CLUBS': 'black',
          'DIAMONDS': 'red'
      }
  
      const cardColor = colors[card.suit]
  
      return cardColor == nextGuess
  
  }