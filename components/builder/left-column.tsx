import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import { CustomRule } from '~/utils/certlogic'

type Props = {
  customRule: CustomRule
  isNewRule: boolean
  onLoad: () => void
  onSave: () => void
  onChange: (customRule: CustomRule) => void
  onDelete: () => void
}

const LeftColumn = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Box bg="gray.700" px="10" py="5" minWidth="378" display="flex" flexDirection="column">
      <Center flexDirection="column" mb="5">
        <Heading as="h1" size="lg" flex="1">
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            CovidValidator
          </Link>{' '}
          <Text display="inline" fontSize="lg" color="red">
            BETA
          </Text>
        </Heading>
        <Text fontSize="xl">Rule Builder</Text>
      </Center>
      <SimpleGrid mb="5" display="flex" spacing="5">
        <Button flex="1" onClick={props.onLoad}>
          Load
        </Button>
        <Button
          flex="1"
          colorScheme="blue"
          onClick={props.onSave}
          disabled={props.customRule.name === ''}
        >
          Save
        </Button>
      </SimpleGrid>
      <Box mb="10">
        <FormControl mb="5">
          <Input
            placeholder="Name (required)"
            value={props.customRule.name}
            onChange={e => props.onChange({ ...props.customRule, name: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <Input
            placeholder="Description"
            value={props.customRule.description}
            onChange={e => props.onChange({ ...props.customRule, description: e.target.value })}
          />
        </FormControl>
      </Box>
      {!props.isNewRule && (
        <Box mb="5" display="flex">
          <Button size="sm" variant="ghost" colorScheme="red" flex="1" onClick={props.onDelete}>
            Delete Rule
          </Button>
        </Box>
      )}
      {props.customRule.id !== '' && (
        <>
          <Box mt="5" mb="5" p="5" rounded="25" backgroundColor="white">
            <QRCode value="hey" />
          </Box>
          <Text>Scan QR code to import on other devices</Text>
        </>
      )}
      <Spacer />
      <hr />
      <Center flexDirection="column" mt="5">
        <Box>
          <Link
            href="https://github.com/timokoenig/covid-validator"
            target="_blank"
            px="2"
            display="inline-block"
          >
            {t('github')}
          </Link>
          |
          <Link href="https://ko-fi.com/timokoenig" target="_blank" px="2" display="inline-block">
            {t('sponsor')}
          </Link>
        </Box>
        <Box>
          <Link href="/privacy" px="2" display="inline-block">
            {t('privacy')}
          </Link>
          |
          <Link href="/imprint" px="2" display="inline-block">
            {t('imprint')}
          </Link>
        </Box>
      </Center>
    </Box>
  )
}

export default LeftColumn
