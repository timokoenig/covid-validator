/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: 'en',
    resources: {
      en: {
        common: require('../translations/en/common.json'),
        country: require('../translations/en/country.json'),
      },
      de: {
        common: require('../translations/de/common.json'),
        country: require('../translations/de/country.json'),
      },
      fr: {
        common: require('../translations/fr/common.json'),
        country: require('../translations/fr/country.json'),
      },
      lt: {
        common: require('../translations/lt/common.json'),
        country: require('../translations/lt/country.json'),
      },
      pl: {
        common: require('../translations/pl/common.json'),
        country: require('../translations/pl/country.json'),
      },
      ro: {
        common: require('../translations/ro/common.json'),
        country: require('../translations/ro/country.json'),
      },
      es: {
        common: require('../translations/es/common.json'),
        country: require('../translations/es/country.json'),
      },
    },
  })
  .catch(console.log)

export default i18next
