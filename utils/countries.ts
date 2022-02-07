import moment from 'moment'
import { TFunction } from 'react-i18next'
import countryBusinessRules from './eu-dcc-rules.json'
import { Rules } from './certlogic'
import { Country } from './models'

const countriesWithRules = [
  ...new Set((countryBusinessRules as Rules).rules.map(rule => rule.Country)),
].sort()

const countries = (t: TFunction): Country[] => {
  return countriesWithRules.map(country => {
    const countryName = t(country)
    const obj = {
      code: country,
      name: countryName === '' ? country : countryName,
      states: [
        {
          code: '',
          name: t('nationwide'),
          updated: moment(countryBusinessRules.updatedAt).toDate(),
        },
      ],
    }

    if (country == 'DE') {
      obj.states = [
        {
          code: '',
          name: t('nationwide'),
          updated: moment(countryBusinessRules.updatedAt).toDate(),
        },
        { code: 'BW', name: 'Baden-Württemberg', updated: new Date() },
        { code: 'BY', name: 'Bayern', updated: new Date() },
        { code: 'BE', name: 'Berlin', updated: new Date() },
        { code: 'BB', name: 'Brandenburg', updated: new Date() },
        { code: 'HB', name: 'Bremen', updated: new Date() },
        { code: 'HH', name: 'Hamburg', updated: new Date() },
        { code: 'HE', name: 'Hessen', updated: new Date() },
        { code: 'MV', name: 'Mecklenburg-Vorpommern', updated: new Date() },
        { code: 'NI', name: 'Niedersachsen', updated: new Date() },
        { code: 'NW', name: 'Nordrhein-Westfalen', updated: new Date() },
        { code: 'RP', name: 'Rheinland-Pfalz', updated: new Date() },
        { code: 'SL', name: 'Saarland', updated: new Date() },
        { code: 'SN', name: 'Sachsen', updated: new Date() },
        { code: 'ST', name: 'Sachsen-Anhalt', updated: new Date() },
        { code: 'SH', name: 'Schleswig-Holstein', updated: new Date() },
        { code: 'TH', name: 'Thüringen', updated: new Date() },
      ]
    }

    return obj
  })
}

export default countries
