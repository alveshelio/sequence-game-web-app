import { gql } from '@apollo/client'

export const GET_USER_TEAMS = gql`
  query GetUserTeams($userId: uuid!) {
    teams(where: { players: { player_id: { _eq: $userId } } }) {
      id
      name
      color
      players {
        player {
          id
          name
        }
      }
    }
  }
`

/*
{
  "userId": "9ee722dd-796c-4284-a664-b19aa3c37bc5"
}
 */
