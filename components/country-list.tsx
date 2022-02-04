import React from 'react'
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
} from '@chakra-ui/react'
import StateList from './state-list'
import { Country } from '../utils/models'

type Props = {
  items: Country[]
  selectedCountry: string
  selectedState: string
  onChange: (country: string, state: string) => void
}

const CountryList = (props: Props) => (
  <Accordion
    index={[props.items.findIndex(item => item.code == props.selectedCountry)]}
    onChange={index => props.onChange(props.items[index.valueOf() as number].code, '')}
  >
    {props.items.map(country => (
      <AccordionItem key={country.code}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left" display="flex" flexDirection="row">
              <Image
                src={`https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/${country.code.toLowerCase()}.svg`}
                width="5"
                height="5"
                borderRadius="10"
                marginRight="2"
              />
              <Text fontSize="h4" fontWeight="bold">
                {country.name}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <StateList
            items={country.states}
            selectedItem={props.selectedState}
            onChange={state => props.onChange(props.selectedCountry, state)}
          />
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
)

export default CountryList
