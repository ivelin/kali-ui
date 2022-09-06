import React from 'react'
import { Flex, Button } from '../../styles/elements'
import { PlusIcon } from '@radix-ui/react-icons'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '../../styles/Dialog'
import DeployDaoWrapper from '../deploy-dao/'

export default function NewDao() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '24px',
            fontFamily: 'Bold',
            borderRadius: '10px',
            width: '100%',
            marginTop: '1rem',
            '&:hover': {
              background: '$gray11',
            },
            '&:focus': {
              background: '$gray10',
            },
          }}
        >
          Create
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild />
        <DeployDaoWrapper />
      </DialogContent>
    </Dialog>
  )
}
