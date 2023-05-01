<script setup lang="ts">
import { getLocaleInfo } from '@/i18n'
import { ExclamationIcon, RefreshIcon } from '@heroicons/vue/outline'
import { SparklesIcon } from '@heroicons/vue/solid'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import CustomLayout from '@/components/CustomLayout.vue'
import InputSelector from '@/components/InputSelector.vue'
import IconButton from '@/components/IconButton.vue'
import { useWordTranslations } from '@/compositions/useWordTranslations'
import seedrandom from 'seedrandom'
import { useStorage } from '@vueuse/core'
import QrcodeVue from 'qrcode.vue'
import { computed } from 'vue'
import { useRouterHelper } from '@/compositions/useRouterHelper'
import {
  CHAOS_ROLE_ID,
  NORMAL_ROLE_ID,
  SPY_ROLE_ID,
  type RoleId,
} from '@/data/roles'

const { t, locale } = useI18n()
const router = useRouter()

const { getWordSet, wordSets } = useWordTranslations()
const wordSetOptions = computed(() =>
  wordSets.value.map((ws) => ({ name: ws.name, value: ws.id }))
)

const { getQueryParam } = useRouterHelper()

const gameRound = useStorage<number | undefined>('gameRound', undefined)
if (getQueryParam('gameRound', [], true))
  gameRound.value = getQueryParam('gameRound', [], true)

const playerNumber = useStorage<number | undefined>('playerNumber', undefined)
if (getQueryParam('playerNumber', ['empty'], true) === 'empty')
  playerNumber.value = undefined

const wordSetId = useStorage<number>('wordSetId', wordSetOptions.value[0].value)
if (getQueryParam('wordSetId', [], true))
  wordSetId.value = getQueryParam('wordSetId', [], true)

const wordSet = getWordSet(wordSetId.value)

function handleCreateGame() {
  if (!gameRound.value || !wordSet.value)
    throw new Error('error when creating game')
  const wordId = gameRound.value % wordSet.value.words.length

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
  const orderedRoles: RoleId[] = [
    ...Array(6).fill(NORMAL_ROLE_ID),
    ...Array(4).fill(SPY_ROLE_ID),
    ...Array(1).fill(CHAOS_ROLE_ID),
  ]
  const shuffledRoles: RoleId[] = shuffle(orderedRoles, randomGenerator)

  router.push({
    name: 'game',
    query: {
      roleId: shuffledRoles[playerNumber.value ?? 0],
      wordSetId: wordSetId.value,
      wordId,
    },
  })
}
const url = computed<string>(() => {
  const url = new URL(`${location.origin}/`)
  if (gameRound.value) {
    url.searchParams.append('gameRound', String(gameRound.value))
  }
  url.searchParams.append('wordSetId', String(wordSetId.value))
  url.searchParams.append('playerNumber', 'empty')

  return url.toString()
})

function generateGameRound(): void {
  gameRound.value = Math.round(Math.random() * 10000)
}
</script>

<template>
  <CustomLayout locale-selector>
    <!-- <h1 class="title">{{ t('ui.welcomeText') }}</h1> -->

    <QrcodeVue
      render-as="svg"
      :value="url"
      :margin="2"
      class="qr"
      data-test-id="qr"
      width="100%"
    />
    <span class="field__label field__label--subtitle">{{
      t('ui.qrDescription')
    }}</span>

    <div class="controls">
      <label class="fiel" for="wordSet">
        <span class="field__label">{{ t('ui.wordSet') }}</span>

        <InputSelector
          id="wordSet"
          v-model="wordSetId"
          :options="wordSetOptions"
          class="field__select"
        />
      </label>

      <div class="two-columns">
        <label class="fiel field--gameRound" for="gameRound">
          <span class="field__label">{{ t('ui.gameRound') }}</span>
          <input
            id="gameRound"
            v-model="gameRound"
            class="field__input"
            type="number"
            required
            max="999999"
            min="0"
            step="1"
          />
          <button class="generate" @click="generateGameRound">
            <RefreshIcon class="generate__icon" aria-label="Generate" />
          </button>
        </label>

        <label class="fiel field--playerNumber" for="playerNumber">
          <span class="field__label">{{ t('ui.playerNumber') }}</span>
          <input
            id="playerNumber"
            v-model="playerNumber"
            class="field__input"
            type="number"
            required
            :max="6 + 4 + 1"
            min="1"
            step="1"
          />
        </label>
      </div>
    </div>

    <div class="best-played__wrapper">
      <div
        v-if="
            typeof locale === 'string' && wordSet &&
            !(wordSet.bestPlayedWith as string[]).includes(locale)
          "
        class="best-played"
      >
        <ExclamationIcon class="best-played__icon" />
        <span
          >{{ t('ui.wordSetBadLanguage') }}:
          {{
            wordSet.bestPlayedWith
              .map((lang) => getLocaleInfo(lang).name)
              .join(', ')
          }}</span
        >
      </div>
    </div>
    <IconButton
      :disabled="!playerNumber || !gameRound"
      main
      @click="handleCreateGame"
    >
      <template #icon> <SparklesIcon /> </template>{{ t('ui.startGame') }}
    </IconButton>
  </CustomLayout>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 1rem;
  font-size: 3rem;
  text-align: center;
}

.field {
  &--gameRound {
    position: relative;

    > input {
      height: calc(5rem + 2px);
      padding-right: calc(5rem + 1px);
    }
  }

  &__label {
    display: block;
    margin: 0.5rem 0 0.5rem 0.25rem;
    font-size: 1.2rem;
    line-height: 0.85;
    text-align: left;

    &--subtitle {
      margin-top: 0;
      color: #999;
      font-size: 1rem;
    }

    &--desc {
      font-size: 1rem;
    }
  }

  &__select {
    width: 100%;
    max-width: unset;
    padding: 0.75rem 1.25rem;
    font-size: 1.25rem;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    margin: 0 auto;
    background-color: var(--color-background-soft);
    box-shadow: 0 0 0 0 var(--color-primary);
    color: inherit;
    font-size: 3rem;
    line-height: 3rem;
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

.best-played {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: solid 2px var(--color-red);
  border-radius: 0.5rem;
  color: var(--color-red);

  &__icon {
    height: 22px;
    margin-right: 0.25rem;
    vertical-align: middle;
  }

  &__wrapper {
    display: inline-block;
    margin-top: 0.5rem;
    text-align: center;
  }
}

.qr {
  width: 100%;
  max-width: 17rem;
  height: unset;
}

.two-columns {
  display: grid;
  align-items: end;
  margin-top: 1rem;
  gap: 1rem;
  grid-template-columns: 2fr minmax(6rem, 1fr);
}

.controls {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

.generate {
  position: absolute;
  right: 0;
  bottom: 0;
  display: inline-block;
  height: calc(5rem + 2px);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0 0.5rem 0.5rem 0;
  background: none;
  background-color: var(--color-background-soft);
  box-shadow: 0 0 0 0 var(--color-primary);
  cursor: pointer;
  line-height: 1;
  outline: none;
  transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-primary);
  }

  &__icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
