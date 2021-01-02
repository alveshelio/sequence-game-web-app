import { gql } from '@apollo/client'

export const FIND_ACTIVE_GAMES = gql`
  query FindActiveGames {
    games(where: { in_progress: { _eq: true } }) {
      teams {
        id
        color
        name
        players {
          player {
            id
            name
            email
          }
        }
      }
    }
  }
`

export const FIND_PAST_GAMES = gql`
  query FindPastGames($startedAt: timestamptz!) {
    games(
      where: { _and: [{ in_progress: { _eq: false } }, { started_at: { _lte: $startedAt } }] }
    ) {
      id
      winner {
        id
        name
        color
      }
      teams {
        id
        color
        name
        players {
          player {
            id
            name
            email
          }
        }
      }
    }
  }
`

/*
{
  "startedAt": "2021-01-03T20:24:40.536898+00:00"
}
*/

export const FIND_FUTURE_GAMES = gql`
  query FindFutureGames($startedAt: timestamptz!) {
    games(
      where: { _and: [{ in_progress: { _eq: false } }, { started_at: { _gte: $startedAt } }] }
    ) {
      id
      teams {
        id
        color
        name
        players {
          player {
            id
            name
            email
          }
        }
      }
    }
  }
`

/*
{
  "startedAt": "2021-01-03T20:24:40.536898+00:00"
}
*/
