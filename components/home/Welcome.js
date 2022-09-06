import React from 'react'
import { Flex, Button, Box } from '../../styles/elements'
import { styled } from '../../styles/stitches.config'
import { GoSearch } from 'react-icons/go'
import NewDao from './NewDao'
import DaoCard from './DaoCard'

const SearchBar = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '10px',
  minWidth: '45rem',
  background: '$gray2',
  color: '$gray12',
  border: '1px solid $gray6',
  borderRadius: '20px',
  gap: '5px',
  '&:focus': {
    outline: 'none',
  },

  '@media (max-width: 540px)': {
    minWidth: '20rem',
  },
})

const SearchInput = styled('input', {
  border: 'none',
  outline: 'none',
  background: 'none',
  color: '$gray12',
  lineHeight: '1.5',
  fontSize: '24px',
})

export default function Welcome({ daos }) {
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  const [searched, setSearched] = React.useState(false)

  const handleSearch = React.useCallback((e) => {
    if (search === '') return
    setSearched(false)

    const results = []

    Object.keys(daos).forEach((key) => {
      daos[key].forEach((dao) => {
        if (dao.token.name.toLowerCase().includes(search.toLowerCase())) {
          dao['chainId'] = key
          results.push(dao)
        }
      })
    })
    setSearchResults(results)
    setSearched(true)
  })

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.nativeEvent.charCode === 13) {
      handleSearch()
    }
  }

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '@media (max-width: 540px)': {},
      }}
    >
      <Box
        css={{
          fontFamily: 'Regular',
          fontSize: '48px',

          '@media (max-width: 540px)': {
            fontSize: '32px',
          },
        }}
      >
        Create or join a DAO now.
      </Box>
      <SearchBar>
        <GoSearch />
        <SearchInput placeholder="KaliDAO" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeypress} />
      </SearchBar>
      <Flex gap="md">
        <Button
          css={{
            fontSize: '24px',
            fontFamily: 'Bold',
            borderRadius: '10px',

            '&:hover': {
              background: '$gray11',
            },
            '&:focus': {
              background: '$gray10',
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <NewDao />
      </Flex>
      <Flex dir="col" gap="md">
        {searched === true && searchResults.length === 0 && 'No results found.'}
        {searchResults.map((result) => (
          <DaoCard key={result['id']} dao={result} chain={result['chainId']} />
        ))}
      </Flex>
    </Flex>
  )
}
