import { Request, Response } from 'express'
import { GraphQLClient, gql } from 'graphql-request'

const FIND_PLAYER_BY_EMAIL = gql`
  query FinPlayerById($email: String!) {
    players(where: { email: { _eq: $email } }) {
      id
    }
  }
`

const FIND_USER_BY_ID = gql`
  query FinUserById($userId: uuid!) {
    users_by_pk(id: $userId) {
      account {
        email
      }
    }
  }
`

const ASSOCIATE_PLAYER_WITH_USER = gql`
  mutation AssociatePlayerWithUser($userId: uuid!, $playerId: uuid!) {
    update_users_by_pk(pk_columns: { id: $userId }, _set: { player_id: $playerId }) {
      id
      player_id
    }
  }
`

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body.event.data.new
    const client = new GraphQLClient(process.env.NHOST_HASURA_URL as string, {
      headers: {
        ['x-hasura-admin-secret']: process.env.NHOST_HASURA_ADMIN_SECRET as string,
      },
    })

    const { users_by_pk } = await client.request(FIND_USER_BY_ID, { userId: user.id })
    if (users_by_pk) {
      const { players } = await client.request(FIND_PLAYER_BY_EMAIL, {
        email: users_by_pk.account.email,
      })
      if (players.length) {
        await client.request(ASSOCIATE_PLAYER_WITH_USER, {
          userId: user.id,
          playerId: players[0].id,
        })
        res.status(201).send()
        return
      }
    }
    res.status(204).send()
  } catch (e) {
    res.status(500).send(e.message)
  }
}
