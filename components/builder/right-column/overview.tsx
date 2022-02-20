import { Box, Button, Heading, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CertificateRule, CustomRule, ImmunizationRule } from '../../../utils/certlogic'
import ImmunizationWizardModal from '../modal/immunization-wizard'
import WizardModal from '../modal/wizard'
import ImmunizationRuleComponent from './immunization-rule'
import RuleComponent from './rule'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onEdit: () => void
  onEditCertificateRule: (rule: CertificateRule) => void
  onEditImmunizationRule: (rule: ImmunizationRule) => void
}

const Overview = (props: Props) => {
  const { t } = useTranslation('common')
  const {
    isOpen: isOpenImmunization,
    onOpen: onOpenImmunization,
    onClose: onCloseImmunization,
  } = useDisclosure()
  const {
    isOpen: isOpenCertificate,
    onOpen: onOpenCertificate,
    onClose: onCloseCertificate,
  } = useDisclosure()

  const onAddCertificateRule = (rule: CertificateRule) => {
    onCloseCertificate()
    props.onEditCertificateRule(rule)
  }

  const onAddImmunizationRule = (rule: ImmunizationRule) => {
    onCloseImmunization()
    props.onEditImmunizationRule(rule)
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          <Heading flex="1">{props.customRule.name}</Heading>
          <Button colorScheme="blue" onClick={props.onEdit}>
            {t('edit')}
          </Button>
        </Box>
        {props.customRule.description !== '' && <Text mb="5">{props.customRule.description}</Text>}

        <Box display="flex" alignItems="center" flexDirection="row" mb="5">
          <Text mr="5" fontWeight="semibold">
            {t('builder.rules.immunization')}
          </Text>
          <Button size="sm" colorScheme="blue" onClick={onOpenImmunization}>
            {t('add')}
          </Button>
        </Box>
        <SimpleGrid mb="10" spacing="5">
          {props.customRule.immunizationRules.length === 0 && (
            <Text>{t('builder.rules.empty')}</Text>
          )}
          {props.customRule.immunizationRules.map(rule => (
            <ImmunizationRuleComponent
              key={rule.id}
              rule={rule}
              onEdit={() => props.onEditImmunizationRule(rule)}
            />
          ))}
        </SimpleGrid>

        <Box display="flex" alignItems="center" flexDirection="row" mb="5">
          <Text fontWeight="semibold" mr="5">
            {t('builder.rules.certificate')}
          </Text>
          <Button size="sm" colorScheme="blue" onClick={onOpenCertificate}>
            {t('add')}
          </Button>
        </Box>
        <SimpleGrid mb="5" spacing="5">
          {props.customRule.rules.length === 0 && <Text>{t('builder.rules.empty')}</Text>}
          {props.customRule.rules.map(rule => (
            <RuleComponent
              key={rule.id}
              rule={rule}
              onEdit={() => props.onEditCertificateRule(rule)}
            />
          ))}
        </SimpleGrid>
      </Box>
      <WizardModal
        isOpen={isOpenCertificate}
        onClose={onCloseCertificate}
        onAdd={onAddCertificateRule}
      />
      <ImmunizationWizardModal
        isOpen={isOpenImmunization}
        onClose={onCloseImmunization}
        onAdd={onAddImmunizationRule}
      />
    </>
  )
}

export default Overview
