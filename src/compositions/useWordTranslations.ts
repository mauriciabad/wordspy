/* eslint-disable @intlify/vue-i18n/no-dynamic-keys */

import { useI18n } from 'vue-i18n'

const wordSetsInfo: Record<number, Pick<WordSet, 'bestPlayedWith'> & {
  totalWords: number,
}> = {
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
type LanguageCode = 'es' | 'en'

export type WordSet = {
  id: number,
  name: string,
  description: string,
  bestPlayedWith: LanguageCode[]
  words: string[],
}

export function useWordTranslations() {
  const { t } = useI18n()

  const wordSets: WordSet[] = Object.entries(wordSetsInfo).map(([wordSetId, info]) => ({
    id: Number(wordSetId),
    name: t(`wordSets.${wordSetId}.name`),
    description: t(`wordSets.${wordSetId}.description`),
    bestPlayedWith: info.bestPlayedWith,
    words: [...Array(info.totalWords).keys()].map((i) => i + 1).map((wordId) => t(`wordSets.${wordSetId}.words.${wordId}`))
  }))

  function getWord(wordId: number, wordSetId: number): string {
    return t(`wordSets.${wordSetId}.words.${wordId}`)
  }

  function getWordSet(wordSetId: number): WordSet {
    const wordSet = wordSets.find(({ id }) => id === wordSetId)
    if (!wordSet) throw new Error("Wrong wordSetId");
    return wordSet
  }

  return { getWord, getWordSet, wordSets }
}
