import { Team, TeamColor } from '@models/team'

export const findTeamIndex = ({
  teams,
  teamColor,
}: {
  teams: Team[]
  teamColor: TeamColor
}): number => {
  return teams.findIndex((t) => t.color === teamColor)
}
