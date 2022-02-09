import React from 'react'
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import countries from '../../../utils/countries'
import Flag from '../../flag'
import StateList from './state-list'

type Props = {
  selectedCountry: string
  selectedState: string
  onChange: (country: string, state: string) => void
}

const CountryList = (props: Props) => {
  const { t } = useTranslation('country')
  const items = countries(t)
  return (
    <Accordion
      index={[items.findIndex(item => item.code == props.selectedCountry)]}
      onChange={index => props.onChange(items[index.valueOf() as number].code, '')}
    >
      {items.map(country => (
        <AccordionItem key={country.code}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" display="flex" flexDirection="row">
                <Flag country={country.code.toLowerCase()} size={20} />
                <Text fontSize="h4" fontWeight="bold" ml="2">
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
}

export default CountryList
