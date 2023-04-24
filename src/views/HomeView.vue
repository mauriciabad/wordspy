<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import CustomLayout from '@/components/CustomLayout.vue'
import { ref } from 'vue'
import IconButton from '@/components/IconButton.vue'
import { useWordTranslations } from '@/compositions/useWordTranslations'
import seedrandom from 'seedrandom'
import { useStorage } from '@vueuse/core'

const { t } = useI18n()
const router = useRouter()

const gameRound = useStorage<number | undefined>('gameRound', 1)
const playerNumber = useStorage<number | undefined>('playerNumber', undefined)
const wordSetId = useStorage<number | undefined>('wordSetId', 2)
const { getWordSet } = useWordTranslations()

console.log(getWordSet(2))

function handleCreateGame() {
  const wordSet = getWordSet(wordSetId.value ?? 2)
  const wordId = (gameRound.value ?? 1) % wordSet.words.length

  // Fisher-Yates Algorithm
  function shuffle<T>(array: T[], randomGenerator: () => number): T[] {
    array = [...array]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(randomGenerator() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const randomGenerator = seedrandom(`${gameRound.value}`)
  const orderedRoles = [...'1'.repeat(6), ...'2'.repeat(4), ...'3'.repeat(1)]
  const shuffledRoles = shuffle(orderedRoles, randomGenerator)

  router.push({
    name: 'game',
    query: {
      roleId: shuffledRoles[playerNumber.value ?? 0],
      wordSetId: wordSetId.value,
      wordId,
    },
  })
}
</script>

<template>
  <CustomLayout locale-selector>
    <div class="content">
      <h1 class="title">{{ t('ui2.welcomeText') }}</h1>
      <div>
        <label class="fiel">
          <span class="field__label">{{ t('ui2.gameRound') }}</span>
          <input
            v-model="gameRound"
            class="field__input"
            type="number"
            required
            max="999999"
            min="0"
            step="1"
          />
        </label>

        <label class="fiel">
          <span class="field__label">{{ t('ui2.playerNumber') }}</span>
          <input
            v-model="playerNumber"
            class="field__input"
            type="number"
            required
            max="999999"
            min="0"
            step="1"
          />
        </label>

        <label class="fiel">
          <span class="field__label">{{ t('ui2.wordSet') }}</span>
          <span class="field__label field__label--subtitle">6 & 15</span>
          <input
            v-model="wordSetId"
            class="field__input"
            type="number"
            required
            max="999999"
            min="0"
            step="1"
          />
        </label>
      </div>

      <IconButton
        :disabled="!playerNumber || !gameRound"
        main
        @click="handleCreateGame"
      >
        <template #icon>
          <SparklesIcon /> </template
        >{{ t('ui.createGame') }}
      </IconButton>
    </div>
  </CustomLayout>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 1rem;
  font-size: 3rem;
  text-align: center;
}

.field {
  &__label {
    display: block;
    margin-top: 0.5rem;
    margin-left: 0.25rem;
    font-size: 1rem;
    text-align: center;

    &--subtitle {
      margin-top: -0.5rem;
      color: #999;
    }
  }

  &__input {
    display: block;
    width: 7ch;
    padding: 0.125rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    margin: 0 auto;
    background-color: var(--color-background-soft);
    box-shadow: 0 0 0 0 var(--color-primary);
    color: inherit;
    font-size: 3rem;
    outline: none;
    text-align: center;
    transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      appearance: none;
    }

    /* Firefox */
    &[type='number'] {
      appearance: textfield;
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px var(--color-primary);
    }

    &--textarea {
      height: 6rem;
      min-height: 6rem;
      resize: vertical;
    }
  }
}
</style>
