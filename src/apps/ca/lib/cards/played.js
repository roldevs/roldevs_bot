const R = require('ramda');

const defaultToNull = R.defaultTo(null);
const randomFromArray = (array) => defaultToNull(
    array[Math.floor(Math.random() * array.length)],
);

const CAPlayedCards = ({playedString}) => {
  const _cards = [
    'r', 'r', 'r', 'r', // Percance de personaje
    'o4', 'o5', 'o6', 'o7', // Obstaculo de personaje
    'e4', 'e5', 'e6', 'e7', // Obstaculo de entorno
    'p', 'p', 'p', 'p', // Pista
  ];

  const _cardIsD = R.compose(R.equals('d'), R.trim);
  const _cardIsInCards = R.compose(R.flip(R.contains)(_cards), R.trim);
  const _containsCard = (card) => _cardIsD(card) || _cardIsInCards(card);

  const _splitPlayedCards = R.compose(
      R.map(R.trim),
      R.filter(_containsCard),
      R.split(','),
      R.defaultTo(''),
  )(playedString);

  const _containsPlayedCard = R.flip(R.contains)(_splitPlayedCards);

  const _countingAlreadyPlayedCard = (card) =>
    R.compose(R.length, R.filter(R.equals(card)))(_splitPlayedCards);

  const _alreadyPlayedR = () => _countingAlreadyPlayedCard('r') === 4;
  const _alreadyPlayedP = () => _countingAlreadyPlayedCard('p') === 4;

  const _alreadyPlayedOorE = (card) => {
    if (!_containsCard(card)) {
      return true;
    }

    if (_containsPlayedCard(card)) {
      return true;
    }

    return false;
  };

  const _timeForD = () => {
    const l = _splitPlayedCards.length;

    return (l === 6 || l === 13 || l === 18);
  };

  const _pickRandomCard = () => randomFromArray(_cards);

  const nextCards = () => {
    if (_splitPlayedCards.length === 19) {
      return _splitPlayedCards;
    }

    if (_timeForD()) { // Toca Dama
      return R.concat(_splitPlayedCards, ['d']);
    }

    let card;
    do {
      card = _pickRandomCard();

      if (
        (card === 'r' && !_alreadyPlayedR(card)) ||
        (card === 'p' && !_alreadyPlayedP(card)) ||
        !_alreadyPlayedOorE(card)
      ) {
        return R.concat(_splitPlayedCards, [card]);
      }
    } while (true);
  };

  return {
    nextCards,
  };
};

module.exports = CAPlayedCards;
