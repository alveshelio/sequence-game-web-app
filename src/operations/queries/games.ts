import { gql } from '@apollo/client'

export const FIND_ACTIVE_GAMES = gql`
  query FindActiveGames {
    games(where: { in_progress: { _eq: true } }) {
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
  Header to be passed to useQuery
  x-hasura-role: me
  x-hasura-user-id: userId
 */

export const FIND_PAST_GAMES = gql`
  query FindPastGames($endedAt: timestamptz!) {
    games(
      where: { _and: [{ in_progress: { _eq: false } }, { ended_at: { _lte: $endedAt } }] }
      order_by: { ended_at: asc }
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
  Header to be passed to useQuery
  x-hasura-role: me
  x-hasura-user-id: userId
  variables:
    "endedAt": "2021-01-03T20:24:40.536898+00:00"
}
*/

export const FIND_USER_FUTURE_GAMES = gql`
  query FindFutureGames {
    games(where: { _and: [{ in_progress: { _eq: false } }, { started_at: { _is_null: true } }] }) {
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
  Header to be passed to useQuery
  x-hasura-role: me
  x-hasura-user-id: userId
 */
