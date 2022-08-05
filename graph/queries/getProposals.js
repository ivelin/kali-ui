import { GRAPH_URL } from '../url'
import { useQuery } from 'react-query'

export const getProposals = async (chainId, address) => {
  console.log('infoParms', chainId, address)
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            daos(where: {
              id: "${address.toLowerCase()}"
            }) {
                proposals {
                    serial
                    proposer
                    proposalType
                    description
                    sponsor
                    sponsored
                    cancelled
                    status
                    votes {
                      voter
                      vote
                      weight
                    }
                    creationTime
                    votingStarts
                    dao {
                      votingPeriod
                    }
                  }
            }
          }`,
      }),
    })

    const data = await res.json()
    return data
  } catch (e) {
    return e
  }
}

export function useGetProposals(chainId, daoAddress) {
  return useQuery(['getProposals', chainId, daoAddress], async () => {
    const data = await getProposals(chainId, daoAddress)
    return data
  })
}
