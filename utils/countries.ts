import moment from 'moment'
import countryBusinessRules from './eu-dcc-rules.json'
import { Rules } from './certlogic'

const countryNames = [
  { code: 'IT', name: 'Italy' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'DK', name: 'Denmark' },
  { code: 'GR', name: 'Greece' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'HR', name: 'Croatia' },
  { code: 'IS', name: 'Iceland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PL', name: 'Poland' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'DE', name: 'Germany' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'EE', name: 'Estonia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'AT', name: 'Austria' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'FI', name: 'Finland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'RO', name: 'Romania' },
  { code: 'NO', name: 'Norway' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'FR', name: 'France' },
  { code: 'MT', name: 'Malta' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'VA', name: 'Holy See (Vatican City State)' },
  { code: 'SM', name: 'San Marino' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'TR', name: 'Turkey' },
  { code: 'MK', name: 'Macedonia' },
  { code: 'AD', name: 'AndorrA' },
  { code: 'MC', name: 'Monaco' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'MA', name: 'Morocco' },
  { code: 'AL', name: 'Albania' },
  { code: 'IL', name: 'Brazil' },
  { code: 'PA', name: 'Panama' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AM', name: 'Armenia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'GE', name: 'Georgia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'SG', name: 'Singapore' },
  { code: 'TG', name: 'Togo' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'TH', name: 'Thailand' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'RS', name: 'Serbia' },
]

const countriesWithRules = [
  ...new Set((countryBusinessRules as Rules).rules.map(rule => rule.Country)),
].sort()

const countries = countriesWithRules.map(country => {
  const countryName = countryNames.find(c => c.code == country)
  const obj = {
    code: country,
    name: countryName ? countryName.name : country,
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
