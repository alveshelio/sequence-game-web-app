import { Request, Response } from 'express'
import { GraphQLClient, gql } from 'graphql-request'

const FIND_USER_BY_EMAIL = gql`
  query FinUserById($email: citext!) {
    users(where: { account: { email: { _eq: $email } } }) {
      player_id
      id
    }
  }
`

const ASSOCIATE_USER_WITH_PLAYER = gql`
  mutation AssociateUserWithPlayer($userId: uuid!, $playerId: uuid!) {
    update_users_by_pk(pk_columns: { id: $userId }, _set: { player_id: $playerId }) {
      id
      player_id
    }
  }
`

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const player = req.body.event.data.new
    const client = new GraphQLClient(process.env.NHOST_HASURA_URL as string, {
      headers: {
        ['x-hasura-admin-secret']: process.env.NHOST_HASURA_ADMIN_SECRET as string,
      },
    })

    const { users } = await client.request(FIND_USER_BY_EMAIL, { email: player.email })
    // we have a user but hasn't yet been associated with a player
    if (users.length && users[0].player_id === null) {
      await client.request(ASSOCIATE_USER_WITH_PLAYER, {
        userId: users[0].id,
        playerId: player.id,
      })
      res.status(201).send()
      return
    }
    res.status(204).send()
  } catch (e) {
    res.status(500).send(e.message)
  }
}
