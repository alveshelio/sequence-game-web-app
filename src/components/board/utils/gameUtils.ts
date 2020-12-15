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

/*
 * Will rotate a matrix [
 * [], [],
 * [], [],
 * ]
 * clockwise
 * */
export const rotateMatrix = (matrix: string[][]): string[][] => {
  const n = matrix.length
  const x = Math.floor(n / 2)
  const y = n - 1
  for (let i = 0; i < x; i++) {
    for (let j = i; j < y - i; j++) {
      const k = matrix[i][j]
      matrix[i][j] = matrix[y - j][i]
      matrix[y - j][i] = matrix[y - i][y - j]
      matrix[y - i][y - j] = matrix[j][y - i]
      matrix[j][y - i] = k
    }
  }
  return matrix
}
