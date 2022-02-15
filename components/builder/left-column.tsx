import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Heading,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { builder } from '../../state/builder'
import { CustomRule } from '../../utils/certlogic'

type Props = {
  customRule: CustomRule | null
  onCreate: () => void
  onChange: (customRule: CustomRule) => void
}

const LeftColumn = (props: Props) => {
  const { t } = useTranslation('common')
  const builderState = builder.use()

  return (
    <Box
      bg={useColorModeValue('gray.200', 'gray.700')}
      px="10"
      py="5"
      minWidth="350"
      display="flex"
      flexDirection="column"
      overflow="scroll"
    >
      <Center flexDirection="column" mb="5">
        <Heading as="h1" size="lg" flex="1">
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            CovidValidator
          </Link>{' '}
          <Text display="inline" fontSize="lg" color="red">
            BETA
          </Text>
        </Heading>
        <Text fontSize="xl">{t('builder')}</Text>
      </Center>
      <SimpleGrid mb="5" display="flex" spacing="5">
        <Button flex="1" onClick={props.onCreate} colorScheme="blue">
          {t('new')}
        </Button>
      </SimpleGrid>
      <List>
        {builderState.customRules.map(customRule => (
          <ListItem key={customRule.id} display="flex">
            <Button
              variant={customRule.id === props.customRule?.id ? 'solid' : 'ghost'}
              flex="1"
              justifyContent="left"
              onClick={() => props.onChange(customRule)}
            >
              {customRule.name}
              <Spacer />
              <ChevronRightIcon width="5" height="5" />
            </Button>
          </ListItem>
        ))}
      </List>
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
