import { gql } from '@apollo/client'

export const FIND_USERS_BY_EMAIL = gql`
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
