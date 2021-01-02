import { gql } from '@apollo/client'

export const CREATE_GAME = gql`
  mutation CreateGame($teams: [teams_insert_input!]!) {
    insert_games_one(object: { teams: { data: $teams } }) {
      teams {
        name
        color
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
  "teams": [
    {
      "name": "Red",
      "color": "Red",
      "players": {
        "data": [
          {
            "player_id": "9ee722dd-796c-4284-a664-b19aa3c37bc5"
          },
          {
            "player_id": "6b5e911d-37cb-49f0-be6f-8cd95ae8f025"
          }
        ]
      }
    },
    {
      "name": "Green",
      "color": "Green",
      "players": {
        "data": [
          {
            "player_id": "6188bc16-6820-49a8-b82d-5f45388a23b4"
          },
          {
            "player_id": "9923aa35-0ed9-448c-a874-bf2f5811e12a"
          }
        ]
      }
    }
  ]
}
* */

export const START_GAME = gql`
  mutation StartGame($id: uuid!, $startDate: timestamptz!) {
    update_games_by_pk(pk_columns: { id: $id }, _set: { started_at: $startDate }) {
      id
      started_at
    }
  }
`

/*
{
  "id": "b8b6798e-12ea-4615-bcbd-becd3094f416",
  "startDate": "2021-01-03T20:24:40.536898+00:00"
}
 */

export const END_GAME = gql`
  mutation EndGame($id: uuid!, $winner: uuid!, $endedAt: timestamptz!) {
    update_games_by_pk(pk_columns: { id: $id }, _set: { winner_id: $winner, ended_at: $endedAt }) {
      id
      ended_at
      winner {
        name
        color
      }
    }
  }
`

/*
{
  "id": "b8b6798e-12ea-4615-bcbd-becd3094f416",
  "winner": "757c8cab-03a4-4416-a80c-d09a86b1c3b6",
  "endedAt": "2021-01-03T21:55:40.536898+00:00"
}
 */
