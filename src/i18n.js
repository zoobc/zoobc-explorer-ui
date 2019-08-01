import i18n from 'i18next'

import config from './config'
import en from './language/locales/en.json'
import id from './language/locales/id.json'
import ar from './language/locales/ar.json'

const isDevelop = process.env.NODE_ENV === 'development'

i18n.init({
  // we init with resources
  resources: {
    en: {
      translations: en,
    },
    id: {
      translations: id,
    },
    ar: {
      translations: ar,
    },
  },
  lng: config.app.defaultLang,
  fallbackLng: config.app.defaultLang,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  debug: isDevelop,

  interpolation: {
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
})

export default i18n
