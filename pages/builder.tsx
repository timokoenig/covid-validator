import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import QRCode from 'react-qr-code'
import PageMeta from '../components/page-meta'

const BuilderPage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex color="white" height="100vh">
        <Box bg="gray.700" px="10" py="5" minWidth="300">
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
            <Button flex="1">Load</Button>
            <Button flex="1" colorScheme="blue">
              Save
            </Button>
          </SimpleGrid>
          <Box mb="10">
            <FormControl mb="5">
              <Input placeholder="Name" />
            </FormControl>
            <FormControl mb="5">
              <Input placeholder="ValidFrom" />
            </FormControl>
            <FormControl mb="5">
              <Input placeholder="ValidTo" />
            </FormControl>
            <FormControl mb="5">
              <Input placeholder="Country" />
            </FormControl>
            <FormControl>
              <Input placeholder="Comment" />
            </FormControl>
          </Box>
          <Box mt="5" mb="10" p="5" rounded="25" backgroundColor="white">
            <QRCode value="hey" />
          </Box>
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
              <Link
                href="https://ko-fi.com/timokoenig"
                target="_blank"
                px="2"
                display="inline-block"
              >
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
        <Box flex="1" px="10" py="5">
          <Text>Box 3</Text>
        </Box>
      </Flex>
    </>
  )
}

export default BuilderPage
