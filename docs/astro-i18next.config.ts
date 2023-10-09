/** @type {import('astro-i18next').AstroI18nextConfig} */

export type I18nLocales = 'en' | 'tw'

export default {
  defaultLocale: 'en',
  locales: ['en', 'tw'],
  namespaces: ['common', 'index'],
  defaultNamespace: 'common',
  meta: {
    en: {
      language: 'en',
      name: 'English'
    },
    tw: {
      language: 'zh-TW',
      name: '繁體中文'
    }
  }
}
