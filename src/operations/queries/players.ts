import { gql } from '@apollo/client'

export const FIND_PLAYERS_BY_EMAIL = gql`
  query FindUsersByEmail($emails: [String!]!) {
    players(where: { email: { _in: $emails } }) {
      id
    }
  }
`

/*
{
  "emails": ["helios25@gmail.com","julie2langlois@gmail.com", "langlois45@videotron.ca"]
}
*/

export const FIND_PLAYER_BY_EMAIL = gql`
  query FindUsersByEmail($email: String!) {
    players(where: { email: { _eq: $email } }) {
      id
      name
      email
    }
  }
`

/*
{
  "email": "helios25@gmail.com"
}
*/

export const FIND_PLAYER_BY_ID = gql`
  query FindUserById($id: uuid!) {
    players_by_pk(id: $id) {
      name
      email
    }
  }
`

/*
{
  "id": "9ee722dd-796c-4284-a664-b19aa3c37bc5"
}
 */
