/* eslint-disable @intlify/vue-i18n/no-dynamic-keys */

import { computed, ref, watch, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'

const wordSetsInfo: Record<
  number,
  Pick<WordSet, 'bestPlayedWith'> & {
    totalWords: number
  }
> = {
  '1': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '2': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '3': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '4': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '5': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '6': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '12': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '13': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '14': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '15': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '16': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '17': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
  '18': {
    totalWords: 30,
    bestPlayedWith: ['es'],
  },
}
type Locale = 'es' | 'en'

export type WordSet = {
  id: number
  name: string
  description: string
  bestPlayedWith: Locale[]
  words: string[]
}

export function useWordTranslations() {
  const { t, locale } = useI18n()

  const wordSets = ref<WordSet[]>(getWordsInLang())

  function getWordsInLang(): WordSet[] {
    return Object.entries(wordSetsInfo).map(([wordSetId, info]) => ({
      id: Number(wordSetId),
      name: t(`wordSets.${wordSetId}.name`),
      description: t(`wordSets.${wordSetId}.description`),
      bestPlayedWith: info.bestPlayedWith,
      words: [...Array(info.totalWords).keys()]
        .map((wordId) => t(`wordSets.${wordSetId}.words.${wordId}`)),
    }))
  }

  watch(locale, () => {
    wordSets.value = getWordsInLang()
  })

  function getWord(wordId: number, wordSetId: number): string {
    return t(`wordSets.${wordSetId}.words.${wordId}`)
  }

  function getWordSet(wordSetId: number): ComputedRef<WordSet | undefined> {
    return computed(() => wordSets.value.find(({ id }) => id === wordSetId))
  }

  return { getWord, getWordSet, wordSets }
}
