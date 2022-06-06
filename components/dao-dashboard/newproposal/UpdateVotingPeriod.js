import React, { useState, useEffect } from 'react'
import { useAccount, useNetwork, useContract, useSigner, erc20ABI } from 'wagmi'
import { Flex, Text, Button } from '../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../styles/form-elements'
import { Select } from '../../../styles/form-elements/Select'
import FileUploader from '../../tools/FileUpload'
import KALIDAO_ABI from '../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { getDaoChain } from '../../../utils'
import { getTokenName } from '../../../utils/fetchTokenInfo'
import { uploadIpfs } from '../../tools/ipfsHelpers'
import { getVotingPeriod } from '../../../utils/fetchDaoInfo'
import { AddressZero } from '@ethersproject/constants'
import { votingPeriodToSeconds } from '../../../utils'
import { Warning } from '../../../styles/elements'

export default function UpdateVotingPeriod() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [unit, setUnit] = useState('min')
  const [duration, setDuration] = useState(null)
  const [warning, setWarning] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    const seconds = votingPeriodToSeconds(duration, unit)

    let docs
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Voting Period Proposal', file)
    } else {
      docs = description
    }

    // console.log('Proposal Params - ', 2, docs, [AddressZero], [seconds], [Array(0)])
    if (seconds) {
      try {
        const tx = await kalidao.propose(
          3, // VPERIOD prop
          docs,
          [AddressZero],
          [seconds],
          [Array(0)],
        )
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning("Please set a duration.")
    }
  }

  return (
    <Flex dir="col" gap="md">
      {/* <Text>Update proposal voting period</Text> */}
      <Form>
      <FormElement>
          <Label htmlFor="recipient">Current Voting Period</Label>
          <Text>5 minutes</Text>
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Duration</Label>
          <Input name="recipient" type="number" defaultValue={duration} onChange={(e) => setDuration(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="type">Unit</Label>
          <Select name="type" onValueChange={(value) => setUnit(value)} defaultValue={unit}>
            <Select.Item value="min">minute</Select.Item>
            <Select.Item value="hour">hour</Select.Item>
            <Select.Item value="day">day</Select.Item>
          </Select>
        </FormElement>
        
        <FormElement variant="vertical">
          <Label htmlFor="description">Proposal Note</Label>
          <Input
            as="textarea"
            name="description"
            type="text"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
          />
        </FormElement>
        <Flex gap="sm" align="end" effect="glow">
          <FileUploader setFile={setFile} />
        </Flex>
        {warning && <Warning warning={warning} />}
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
