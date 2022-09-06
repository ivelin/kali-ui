import { formatVotingPeriod } from '../../../../../utils/votingPeriod'
import { Flex } from '../../../../../styles/elements'

export default function GPeriod({ amount }) {
  return <Flex>This proposal will update voting period to {formatVotingPeriod(amount)}</Flex>
}
