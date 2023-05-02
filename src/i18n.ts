import flagEN from '@/assets/flags/flagEN.svg'
import flagES from '@/assets/flags/flagES.svg'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

type Locales = 'en' | 'es'

const i18n = createI18n({
  locale: navigator.language,
  legacy: false,
  fallbackLocale: {
    default: ['en', 'es'],
  },
  messages,
  fallbackWarn: false,
  missingWarn: false,
  warnHtmlInMessage: 'off',
  warnHtmlMessage: true,
})

export interface LocaleInfo {
  id: Locales
  name: string
  icon: string
}

export const localesInfo: LocaleInfo[] = [
  { id: 'en', name: 'English', icon: flagEN },
  { id: 'es', name: 'Español', icon: flagES },
]

export function getLocaleInfo(locale: Locales): LocaleInfo
export function getLocaleInfo(locale: string): LocaleInfo | undefined
export function getLocaleInfo(locale: string): LocaleInfo | undefined {
  return localesInfo.find((l) => l.id === locale)
}

export default i18n
