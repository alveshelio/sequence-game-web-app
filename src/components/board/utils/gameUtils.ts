import { Cards, CardSymbols } from '../data/gameData'

const shuffleDeck = (deck: string[]): string[] => {
  const shuffledDeck = [...deck]
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shuffledDeck[i]
    shuffledDeck[i] = shuffledDeck[j]
    shuffledDeck[j] = tmp
  }

  return shuffledDeck
}

export const buildDeck = (): string[] => {
  const deck = Object.values(CardSymbols).flatMap((s) => {
    return Object.values(Cards)
      .filter((x) => x !== 'joker')
      .map((c) => `${c}-${s}`)
  })

  return shuffleDeck(deck)
}
