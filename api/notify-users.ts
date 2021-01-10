import { Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { GraphQLClient, gql } from 'graphql-request'

interface Player {
  player: {
    email: string
  }
}

interface Team {
  name: string
  color: string
  players: Player[]
}

interface Game {
  teams: Team[]
}

interface Message {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

const FIND_GAME_BY_ID = gql`
  query FindGameById($gameId: uuid!) {
    games_by_pk(id: $gameId) {
      owner {
        email
      }
      teams {
        color
        name
        players {
          player {
            email
          }
        }
      }
    }
  }
`

const FIND_USER_BY_EMAIL = gql`
  query FinUserById($email: citext!) {
    users(where: { account: { email: { _eq: $email } } }) {
      display_name
    }
  }
`

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
export default async (req: Request, res: Response): Promise<void> => {
  const game = req.body.event.data.new

  const client = new GraphQLClient(process.env.NHOST_HASURA_URL as string, {
    headers: {
      ['x-hasura-admin-secret']: process.env.NHOST_HASURA_ADMIN_SECRET as string,
    },
  })

  const { games_by_pk } = await client.request(FIND_GAME_BY_ID, { gameId: game.id })
  const { users } = await client.request(FIND_USER_BY_EMAIL, { email: games_by_pk.owner.email })

  const msg: Message = {
    from: 'Helio <helios25@gmail.com>',
    to: 'heliosjalves@gmail.com',
    subject: 'Testing out email',
    text: 'Sending an email through sending is fun',
    html: "<strong>I hope it's that easy</strong>",
  }

  const createMessage = ({
    to,
    gameId,
    owner,
  }: {
    to: string
    gameId: string
    owner: string
  }): Message => {
    return {
      from: 'Helio <helios25@gmail.com>',
      to: to,
      subject: `Hi, ${owner} invited you to play a ga`,
      text: 'Sending an email through sending is fun',
      html: `<p>You can access the game at: <a href='http://localhost:3000/game/${gameId}'>http://localhost:3000/game/${gameId}</a></p>`,
    }
  }

  const notifyUsers = (currentGame: Game): void => {
    currentGame.teams.forEach((team) => {
      team.players.forEach(async (teamPlayers) => {
        const message = createMessage({
          to: teamPlayers.player.email,
          owner: users[0].display_name,
          gameId: game.id,
        })
        console.warn(message)

        //TODO send email when ready to start ending emails
        // await sgMail.send(message)
      })
    })
  }

  notifyUsers(games_by_pk)

  try {
    await sgMail.send(msg)
  } catch (e) {
    console.warn('error', e)
  }

  res.status(204).send()
}
