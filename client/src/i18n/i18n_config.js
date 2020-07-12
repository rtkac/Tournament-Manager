import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import defaultTranlates from './defaultLocalizations';

// translations
const resources = {
    sk: {
        // translation: JSON.parse(appConfig.APP_DATA_STORAGE.getItem('resources')).sk
        translation: defaultTranlates.sk
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "sk",
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;