/* eslint-disable @intlify/vue-i18n/no-dynamic-keys */

import { useI18n } from 'vue-i18n'

const wordsPerSet: Record<number, number> = {
  '6': 30,
  '15': 30,
}

type WordSet = {
  id: number,
  name: string,
  description: string,
  words: string[],
}

export function useWordTranslations() {
  const { t } = useI18n()

  const wordSets: WordSet[] = Object.entries(wordsPerSet).map(([wordSetId, wordsInSet]) => ({
    id: Number(wordSetId),
    name: t(`wordSets.${wordSetId}.name`),
    description: t(`wordSets.${wordSetId}.description`),
    words: [...Array(wordsInSet).keys()].map((i) => i + 1).map((wordId) => t(`wordSets.${wordSetId}.words.${wordId}`))
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
