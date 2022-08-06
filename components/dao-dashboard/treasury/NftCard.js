import React, { useEffect } from 'react'
import Image from 'next/image'
import { chainId } from 'wagmi'
import useSWR from 'swr'
import { Flex, Box, Text } from '../../../styles/elements'
import { Spinner } from '../../elements/'
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle } from '../../../styles/Dialog'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function NftCard({ nft }) {
  console.log('nft', nft)
  const { data, error } = useSWR(nft.token_uri, fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  console.log('nftMeta', data)
  return (
    <Dialog>
      <DialogTrigger>
        {data ? (
          <Flex
            css={{
              height: '300px',
              width: '250px',
              background: '$gray2',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '20px',
              overflow: 'hidden',

              '&:hover': {
                boxShadow: '2px 2px 10px -1px hsl(252, 87.0%, 96.4%)',
              },
            }}
          >
            <Image src={data['image']} height="250px" width="250px" alt="NFT Image" />
            <Text
              css={{
                color: '$gray11',
                fontFamily: 'Bold',
                fontWeight: '500',
                fontSize: '16px',
                marginBottom: '1rem',
              }}
            >
              {data['name']}
            </Text>
          </Flex>
        ) : (
          <Spinner />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild />
        <DialogTitle
          css={{
            fontFamily: 'Bold',
          }}
        >
          {data['name']}
        </DialogTitle>
        <Flex
          css={{
            padding: '1rem',
            gap: '0.5rem',
          }}
        >
          <Image src={data['image']} height="100%" width="100%" alt="NFT Image" />
          <Flex gap="sm" dir="col" align="separate">
            <Text
              css={{
                fontFamily: 'Regular',
              }}
            >
              {data['description']}
            </Text>
            <Text
              as="a"
              css={{
                fontFamily: 'Regular',
                color: '$amber11',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '0.2rem',
              }}
              href={data['external_url']}
              target="_blank"
            >
              External URL
              <ExternalLinkIcon />
            </Text>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  )
}
