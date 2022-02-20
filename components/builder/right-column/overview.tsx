import { Box, Button, Heading, List, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ListItem from '../../../components/list-item'
import { CertificateRule, CustomRule, ImmunizationRule } from '../../../utils/certlogic'
import vaccines from '../../../utils/vaccines'
import ExportModal from '../modal/export'
import ImmunizationWizardModal from '../modal/immunization-wizard'
import WizardModal from '../modal/wizard'

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
  const { isOpen: isOpenExport, onOpen: onOpenExport, onClose: onCloseExport } = useDisclosure()

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
          <Button variant="ghost" onClick={onOpenExport} mr="5">
            {t('export')}
          </Button>
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
          <List>
            {props.customRule.immunizationRules.map(rule => (
              <ListItem
                key={rule.id}
                title={t(rule.type)}
                subtitle={rule.medicalProducts
                  .map(mp => vaccines.find(vac => vac.id === mp)?.name ?? mp)
                  .join(', ')}
                onClick={() => props.onEditImmunizationRule(rule)}
              />
            ))}
          </List>
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
          <List>
            {props.customRule.rules.map(rule => (
              <ListItem
                key={rule.id}
                title={rule.translations.find(trans => trans.lang === 'en')?.desc ?? rule.id}
                onClick={() => props.onEditCertificateRule(rule)}
              />
            ))}
          </List>
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
      <ExportModal customRule={props.customRule} isOpen={isOpenExport} onClose={onCloseExport} />
    </>
  )
}

export default Overview
