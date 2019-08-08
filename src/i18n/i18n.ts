import i18n from "i18next"
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    load: 'languageOnly',
    interpolation: {
      escapeValue: false
    },
  })

const supportedDateFnsLanguages = {
  af: async () => import("date-fns/locale/af/index.js"),
  arSA: async () => import("date-fns/locale/ar-SA/index.js"),
  bn: async () => import("date-fns/locale/bn/index.js"),
  de: async () => import("date-fns/locale/de/index.js"),
  el: async () => import("date-fns/locale/el/index.js"),
  en: async () => import("date-fns/locale/en-US/index.js"),
  enCA: async () => import("date-fns/locale/en-CA/index.js"),
  enGB: async () => import("date-fns/locale/en-GB/index.js"),
  enUS: async () => import("date-fns/locale/en-US/index.js"),
  eo: async () => import("date-fns/locale/eo/index.js"),
  es: async () => import("date-fns/locale/es/index.js"),
  et: async () => import("date-fns/locale/et/index.js"),
  fr: async () => import("date-fns/locale/fr/index.js"),
  gl: async () => import("date-fns/locale/gl/index.js"),
  he: async () => import("date-fns/locale/he/index.js"),
  hu: async () => import("date-fns/locale/hu/index.js"),
  it: async () => import("date-fns/locale/it/index.js"),
  ja: async () => import("date-fns/locale/ja/index.js"),
  lt: async () => import("date-fns/locale/lt/index.js"),
  nb: async () => import("date-fns/locale/nb/index.js"),
  nl: async () => import("date-fns/locale/nl/index.js"),
  pt: async () => import("date-fns/locale/pt/index.js"),
  ptBR: async () => import("date-fns/locale/pt-BR/index.js"),
  ru: async () => import("date-fns/locale/ru/index.js"),
  sv: async () => import("date-fns/locale/sv/index.js"),
  uk: async () => import("date-fns/locale/uk/index.js"),
  vi: async () => import("date-fns/locale/vi/index.js"),
  zhCN: async () => import("date-fns/locale/zh-CN/index.js")
} as any;

export const loadDateFnsLocale = async () => supportedDateFnsLanguages[i18n.language]()
export default i18n;