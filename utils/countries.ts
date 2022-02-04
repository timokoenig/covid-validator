import countryBusinessRules from './eu-dcc-rules.json'
import { Rules } from './certlogic'
import moment from 'moment'

const countriesWithRules = [
  ...new Set((countryBusinessRules as Rules).rules.map(rule => rule.Country)),
]

let countries = countriesWithRules.map(country => {
  let obj = {
    code: country,
    name: country,
    states: [
      { code: '', name: 'Nationwide', updated: moment(countryBusinessRules.updatedAt).toDate() },
    ],
  }

  if (country == 'DE') {
    obj.states = [
      { code: '', name: 'Nationwide', updated: moment(countryBusinessRules.updatedAt).toDate() },
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

export default countries
