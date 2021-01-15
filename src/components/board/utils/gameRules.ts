const cardsPerPlayer = [
  {
    nbPlayers: 2,
    nbCards: 7,
  },
  {
    nbPlayers: 3,
    nbCards: 6,
  },
  {
    nbPlayers: 4,
    nbCards: 6,
  },
  {
    nbPlayers: 6,
    nbCards: 5,
  },
  {
    nbPlayers: 8,
    nbCards: 4,
  },
  {
    nbPlayers: 9,
    nbCards: 4,
  },
  {
    nbPlayers: 10,
    nbCards: 3,
  },
  {
    nbPlayers: 12,
    nbCards: 3,
  },
]

const winningTeam = [
  {
    nbTeams: 2,
    nbRows: 2,
  },
  {
    nbTeams: 3,
    nbRows: 1,
  },
]

export const gameRules = {
  cardsPerPlayer,
  winningTeam,
}
