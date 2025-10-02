import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../assets/languages/en.json';
import ur from '../assets/languages/ur.json';

const resources = {
  en: en,
  ur: ur,
};

i18n

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en', // default language to use.
  });

export default i18n;
