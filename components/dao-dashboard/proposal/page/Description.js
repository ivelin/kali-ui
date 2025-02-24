import StarterKit from '@tiptap/starter-kit'
import React, { useMemo } from 'react'
import { Flex, Text } from '../../../../styles/elements'
import { generateHTML } from '@tiptap/react'

export default function Description({ description, isSchema }) {
  const output = useMemo(() => {
    if (isSchema && description != undefined) {
      return generateHTML(description, [StarterKit])
    } else {
      return null
    }
  }, [description, isSchema])

  return (
    <Flex
      css={{
        flexDirection: 'column',
        gap: '0.3rem',
        fontFamily: 'Regular',
      }}
    >
      {/* TODO: output could be anything, sanitize?  */}
      {isSchema ? (
        output && <div dangerouslySetInnerHTML={{ __html: output }} />
      ) : description.length > 0 ? (
        <Text>{description}</Text>
      ) : (
        <Text
          css={{
            color: '$gray300',
          }}
        >
          No description.
        </Text>
      )}
    </Flex>
  )
}
