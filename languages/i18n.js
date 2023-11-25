import i18n from "i18next";
import {
    initReactI18next
} from "react-i18next";
import 'intl-pluralrules'
import {
    I18nManager
} from 'react-native';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)


i18n // Add the language detector   
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: I18nManager.isRTL ? "he" : "en",
        supportedLngs: ['he', 'en'],
        ns: [],
        defaultNS: undefined,

        resources: {
            en: {
                translation: require('./en/common.json'),
            },
            he: {
                translation: require('./he/common.json'),
            },
        },

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;