/* eslint-disable @intlify/vue-i18n/no-dynamic-keys */

import { useI18n } from 'vue-i18n'

const wordsPerSet:Record<number,number> = {
  '1':6,
  '2':6
}

type WordSet = {
  name: string,
  description: string,
  words: string[],
}
export function useWordTranslations() {
  const { t } = useI18n()

  function getWord(wordId: number, wordSetId: number): string {
    return t(`wordSets.${wordSetId}.words.${wordId}`)
  }

  function getWordSet(wordSetId: number): WordSet {
    return {
      name: t(`wordSets.${wordSetId}.name`),
      description: t(`wordSets.${wordSetId}.description`),
      words: [...Array(wordsPerSet[wordSetId]).keys()].map((i) => i+1).map((wordId) => t(`wordSets.${wordSetId}.words.${wordId}`))
    }
  }



  return { getWord, getWordSet }
}
