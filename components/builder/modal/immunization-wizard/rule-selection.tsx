import {
  Box,
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  ImmunizationRule,
  immunizationTypeName,
  IMMUNIZATION_TYPE_BOOSTER,
  IMMUNIZATION_TYPE_FULL,
  IMMUNIZATION_TYPE_FULL_RECOVERY,
  IMMUNIZATION_TYPE_PARTIAL,
} from '../../../../utils/certlogic'
import { encodeImmunizationRule } from '../../../../utils/immunization-rule'
import vaccines from '../../../../utils/vaccines'
// import { useTranslation } from 'react-i18next'

type Props = {
  vaccines: string[]
  onClose: () => void
  onCreate: (rule: ImmunizationRule) => void
}

const RuleSelection = (props: Props) => {
  const [dn, setDn] = useState<string>('')
  const [sn, setSn] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('==')
  const [type, setType] = useState<string>(IMMUNIZATION_TYPE_PARTIAL)
  // const { t } = useTranslation('common')

  const onAdd = () => {
    props.onCreate({
      id: uuidv4(),
      medicalProducts: props.vaccines,
      rule: encodeImmunizationRule(dn, sn, symbol),
      type,
    })
  }

  return (
    <ModalContent>
      <ModalHeader>Select Rules</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Box mb="5">
          <Text fontWeight="semibold">Valid for</Text>
          {props.vaccines.map(v => (
            <Text key={v}>{vaccines.find(vac => vac.id === v)?.name}</Text>
          ))}
        </Box>
        <Select value={type} onChange={e => setType(e.target.selectedOptions[0].value)}>
          <option value={IMMUNIZATION_TYPE_PARTIAL}>
            {immunizationTypeName(IMMUNIZATION_TYPE_PARTIAL)}
          </option>
          <option value={IMMUNIZATION_TYPE_FULL}>
            {immunizationTypeName(IMMUNIZATION_TYPE_FULL)}
          </option>
          <option value={IMMUNIZATION_TYPE_FULL_RECOVERY}>
            {immunizationTypeName(IMMUNIZATION_TYPE_FULL_RECOVERY)}
          </option>
          <option value={IMMUNIZATION_TYPE_BOOSTER}>
            {immunizationTypeName(IMMUNIZATION_TYPE_BOOSTER)}
          </option>
        </Select>
        <SimpleGrid columns={3} spacing="5" my="5" alignItems="bottom">
          <Box>
            <Text textAlign="center" mb="2">
              Dose
            </Text>
            <Input
              placeholder="dn"
              value={dn}
              onChange={e => setDn(e.target.value)}
              textAlign="center"
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <Spacer />
            <Select
              value={symbol}
              onChange={e => setSymbol(e.target.selectedOptions[0].value)}
              textAlign="center"
            >
              <option value="==">==</option>
              <option value=">">&gt;</option>
              <option value=">=">&gt;=</option>
            </Select>
          </Box>
          <Box>
            <Text textAlign="center" mb="2">
              Series
            </Text>
            <Input
              placeholder="sn"
              value={sn}
              onChange={e => setSn(e.target.value)}
              textAlign="center"
            />
          </Box>
        </SimpleGrid>
        <Text>
          You can use * as a wildcard.
          <br />
          For example, `* &gt; *` will select all certificates where dose number is greater than
          series number
        </Text>
        {/* <List>
          {items.map(item => (
            <ListItem key={item} display="flex">
              <Button
                variant="ghost"
                flex="1"
                justifyContent="left"
                // onClick={() => props.onClick(item)}
              >
                {item}
                <Spacer />
                <ChevronRightIcon width="5" height="5" />
              </Button>
            </ListItem>
          ))}
        </List> */}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" onClick={onAdd}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default RuleSelection