import { useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { DialogTitle } from '../../styles/Dialog'
import { Progress, ProgressIndicator } from '../../styles/Progress'
import Identity from './Identity'
import Governance from './Governance'
import Redemption from './Redemption'
import Crowdsale from './Crowdsale'
import Members from './Members'
import Legal from './Legal'
import Checkout from './checkout'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { Text } from '../../styles/elements'
import Toggle from './Toggle'

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

createStore({
  hardMode: false,
  votingPeriod: '5',
  votingPeriodUnit: 'day',
  quorum: '20',
  approval: '60',
  transferability: false,
  redemption: false,
  redemptionStart: new Date(),
  crowdsale: false,
  purchaseToken: 'eth',
  purchaseLimit: 10000,
  personalLimit: 100,
  purchaseMultiplier: 10,
  crowdsaleEnd: new Date(),
  legal: false,
  docType: 'none',
})

// TODO:
// Allow interaction with outside from within the modal
export default function DeployDaoWrapper() {
  const [step, setStep] = useState(0)
  // const [hardMode, setHardMode] = useState(false)
  const steps = [
    {
      component: <Identity setStep={setStep} />,
      title: 'Summon KaliDAO',
      description: `You are about to summon a KaliDAO, an on-chain organization 
      with a native KaliDAO token, voting mechanism, and legal structure. To get 
      started, pick a name and symbol for your KaliDAO and KaliDAO token`,
    },
    {
      component: <Governance setStep={setStep} />,
      title: 'Voting',
      description: `Update voting parameters according to your workflow. We recommend shorter 
      voting period and lower participation if decision-making is generally consistent and
      frequent.`,
    },
    {
      component: <Redemption setStep={setStep} />,
      title: 'Extension: Redemption',
      description: `This extension gives everyone the ability
      to redeem KaliDAO treasury based on her balance ratio of KaliDAO tokens.`,
    },
    {
      component: <Crowdsale setStep={setStep} />,
      title: 'Extension: Contribute',
      description: `This extension gives KaliDAO the ability to swap KaliDAO tokens 
      with ETH or ERC20s.`,
    },
    {
      component: <Members setStep={setStep} />,
      title: 'Founding Members',
      description: `If a new founding member is added, we must specify a KaliDAO token
      amount.`,
    },
    {
      component: <Legal setStep={setStep} />,
      title: 'Type of entity',
      description: `Pick an entity for this KaliDAO. Read and understand entity formation 
      documents before making a selection. Review resources below to better identify the 
      entity structure this KaliDAO needs.
      `,
    },
    {
      component: <Checkout setStep={setStep} />,
      title: 'Checkout',
      description: `Other than "Name" and "Symbol," everything else can be changed after
      summoning of your KaliDAO. Any updates will require the proposal process, i.e., 
      voting period, participation %, but you already knew that. That's just blockchain 
      being real.`,
    },
  ]

  return (
    <StateMachineProvider>
      <Flex>
        <DialogTitle
          css={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Text>{steps[step]['title']}</Text>

          <Toggle />
        </DialogTitle>
        <Text variant="instruction">{steps[step]['description']}</Text>
        <Text></Text>
        <Progress value={(step / (steps.length - 1)) * 100}>
          <ProgressIndicator style={{ transform: `translateX(-${100 - (step / (steps.length - 1)) * 100}%)` }} />
        </Progress>
        {steps[step]['component']}
      </Flex>
    </StateMachineProvider>
  )
}
