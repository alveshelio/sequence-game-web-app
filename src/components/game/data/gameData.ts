export const CardSymbols = {
  SPADES: 'spades',
  CLUBS: 'clubs',
  HEARTS: 'hearts',
  DIAMONDS: 'diamonds',
}

export const Cards = {
  ACE: 'ace',
  TWO: 'two',
  THREE: 'three',
  FOUR: 'four',
  FIVE: 'five',
  SIX: 'six',
  SEVEN: 'seven',
  EIGHT: 'eight',
  NINE: 'nine',
  TEN: 'ten',
  JACK: 'jack',
  QUEEN: 'queen',
  KING: 'king',
  JOKER: 'joker',
}

export const board = [
  [
    `${Cards.JOKER}`,
    `${Cards.TWO}-${CardSymbols.SPADES}`,
    `${Cards.THREE}-${CardSymbols.SPADES}`,
    `${Cards.FOUR}-${CardSymbols.SPADES}`,
    `${Cards.FIVE}-${CardSymbols.SPADES}`,
    `${Cards.SIX}-${CardSymbols.SPADES}`,
    `${Cards.SEVEN}-${CardSymbols.SPADES}`,
    `${Cards.EIGHT}-${CardSymbols.SPADES}`,
    `${Cards.NINE}-${CardSymbols.SPADES}`,
    `${Cards.JOKER}`,
  ],
  [
    `${Cards.SIX}-${CardSymbols.CLUBS}`,
    `${Cards.FIVE}-${CardSymbols.CLUBS}`,
    `${Cards.FOUR}-${CardSymbols.CLUBS}`,
    `${Cards.THREE}-${CardSymbols.CLUBS}`,
    `${Cards.TWO}-${CardSymbols.CLUBS}`,
    `${Cards.ACE}-${CardSymbols.HEARTS}`,
    `${Cards.KING}-${CardSymbols.HEARTS}`,
    `${Cards.QUEEN}-${CardSymbols.HEARTS}`,
    `${Cards.TEN}-${CardSymbols.HEARTS}`,
    `${Cards.NINE}-${CardSymbols.SPADES}`,
  ],
  [
    `${Cards.SEVEN}-${CardSymbols.CLUBS}`,
    `${Cards.ACE}-${CardSymbols.CLUBS}`,
    `${Cards.TWO}-${CardSymbols.DIAMONDS}`,
    `${Cards.THREE}-${CardSymbols.DIAMONDS}`,
    `${Cards.FOUR}-${CardSymbols.DIAMONDS}`,
    `${Cards.FIVE}-${CardSymbols.DIAMONDS}`,
    `${Cards.SIX}-${CardSymbols.DIAMONDS}`,
    `${Cards.SEVEN}-${CardSymbols.DIAMONDS}`,
    `${Cards.NINE}-${CardSymbols.DIAMONDS}`,
    `${Cards.QUEEN}-${CardSymbols.SPADES}`,
  ],
  [
    `${Cards.EIGHT}-${CardSymbols.CLUBS}`,
    `${Cards.KING}-${CardSymbols.CLUBS}`,
    `${Cards.SIX}-${CardSymbols.CLUBS}`,
    `${Cards.FIVE}-${CardSymbols.CLUBS}`,
    `${Cards.FOUR}-${CardSymbols.CLUBS}`,
    `${Cards.THREE}-${CardSymbols.CLUBS}`,
    `${Cards.TWO}-${CardSymbols.CLUBS}`,
    `${Cards.EIGHT}-${CardSymbols.DIAMONDS}`,
    `${Cards.EIGHT}-${CardSymbols.HEARTS}`,
    `${Cards.KING}-${CardSymbols.SPADES}`,
  ],
  [
    `${Cards.NINE}-${CardSymbols.CLUBS}`,
    `${Cards.QUEEN}-${CardSymbols.SPADES}`,
    `${Cards.SEVEN}-${CardSymbols.CLUBS}`,
    `${Cards.SIX}-${CardSymbols.HEARTS}`,
    `${Cards.FIVE}-${CardSymbols.HEARTS}`,
    `${Cards.FOUR}-${CardSymbols.HEARTS}`,
    `${Cards.ACE}-${CardSymbols.HEARTS}`,
    `${Cards.NINE}-${CardSymbols.HEARTS}`,
    `${Cards.SEVEN}-${CardSymbols.HEARTS}`,
    `${Cards.ACE}-${CardSymbols.SPADES}`,
  ],
  [
    `${Cards.TEN}-${CardSymbols.CLUBS}`,
    `${Cards.TEN}-${CardSymbols.SPADES}`,
    `${Cards.EIGHT}-${CardSymbols.CLUBS}`,
    `${Cards.SEVEN}-${CardSymbols.HEARTS}`,
    `${Cards.TWO}-${CardSymbols.HEARTS}`,
    `${Cards.THREE}-${CardSymbols.HEARTS}`,
    `${Cards.QUEEN}-${CardSymbols.HEARTS}`,
    `${Cards.TEN}-${CardSymbols.DIAMONDS}`,
    `${Cards.SIX}-${CardSymbols.HEARTS}`,
    `${Cards.TWO}-${CardSymbols.DIAMONDS}`,
  ],
  [
    `${Cards.QUEEN}-${CardSymbols.CLUBS}`,
    `${Cards.NINE}-${CardSymbols.SPADES}`,
    `${Cards.NINE}-${CardSymbols.CLUBS}`,
    `${Cards.EIGHT}-${CardSymbols.HEARTS}`,
    `${Cards.NINE}-${CardSymbols.HEARTS}`,
    `${Cards.TEN}-${CardSymbols.HEARTS}`,
    `${Cards.QUEEN}-${CardSymbols.HEARTS}`,
    `${Cards.QUEEN}-${CardSymbols.DIAMONDS}`,
    `${Cards.FIVE}-${CardSymbols.HEARTS}`,
    `${Cards.THREE}-${CardSymbols.DIAMONDS}`,
  ],
  [
    `${Cards.KING}-${CardSymbols.CLUBS}`,
    `${Cards.EIGHT}-${CardSymbols.SPADES}`,
    `${Cards.TEN}-${CardSymbols.CLUBS}`,
    `${Cards.QUEEN}-${CardSymbols.CLUBS}`,
    `${Cards.KING}-${CardSymbols.CLUBS}`,
    `${Cards.ACE}-${CardSymbols.CLUBS}`,
    `${Cards.ACE}-${CardSymbols.DIAMONDS}`,
    `${Cards.KING}-${CardSymbols.DIAMONDS}`,
    `${Cards.FOUR}-${CardSymbols.HEARTS}`,
    `${Cards.FOUR}-${CardSymbols.DIAMONDS}`,
  ],
  [
    `${Cards.ACE}-${CardSymbols.CLUBS}`,
    `${Cards.SEVEN}-${CardSymbols.SPADES}`,
    `${Cards.SIX}-${CardSymbols.SPADES}`,
    `${Cards.FIVE}-${CardSymbols.SPADES}`,
    `${Cards.FOUR}-${CardSymbols.SPADES}`,
    `${Cards.THREE}-${CardSymbols.SPADES}`,
    `${Cards.TWO}-${CardSymbols.SPADES}`,
    `${Cards.TWO}-${CardSymbols.HEARTS}`,
    `${Cards.THREE}-${CardSymbols.HEARTS}`,
    `${Cards.FIVE}-${CardSymbols.DIAMONDS}`,
  ],
  [
    `${Cards.JOKER}`,
    `${Cards.ACE}-${CardSymbols.DIAMONDS}`,
    `${Cards.KING}-${CardSymbols.DIAMONDS}`,
    `${Cards.QUEEN}-${CardSymbols.DIAMONDS}`,
    `${Cards.TEN}-${CardSymbols.DIAMONDS}`,
    `${Cards.NINE}-${CardSymbols.DIAMONDS}`,
    `${Cards.EIGHT}-${CardSymbols.DIAMONDS}`,
    `${Cards.SEVEN}-${CardSymbols.DIAMONDS}`,
    `${Cards.SIX}-${CardSymbols.DIAMONDS}`,
    `${Cards.JOKER}`,
  ],
]
