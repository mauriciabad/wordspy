<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import CustomLayout from '@/components/CustomLayout.vue'
import { ref } from 'vue';
import IconButton from '@/components/IconButton.vue'

const { t } = useI18n()
const router = useRouter()

const gameRound = ref<number>(Math.round(Math.random() * 100))
const playerNumber = ref<number>()
const wordSet = ref<number>(1)

function handleCreateGame() {
  router.push({ name: 'game', query: { roleId: '1', wordSetId: wordSet.value, wordId: '1' } })
}
</script>

<template>
  <CustomLayout locale-selector>
    <div class="content">
      <h1 class="title">{{ t('ui2.welcomeText') }}</h1>
      <div>
        <label class="fiel">
          <span class="field__label">{{ t('ui2.gameRound') }}</span>
          <input v-model="gameRound" class="field__input" type="number" required max="999999" min="0" step="1" />
        </label>

        <label class="fiel">
          <span class="field__label">{{ t('ui2.playerNumber') }}</span>
          <input v-model="playerNumber" class="field__input" type="number" required max="999999" min="0" step="1" />
        </label>

        <label class="fiel">
          <span class="field__label">{{ t('ui2.wordSet') }}</span>
          <input v-model="wordSet" class="field__input" type="number" required max="999999" min="0" step="1" />
        </label>
      </div>

      <IconButton :disabled="!playerNumber || !gameRound" main @click="handleCreateGame">
        <template #icon>
          <SparklesIcon />
        </template>{{ t('ui.createGame') }}
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
  }



  &__input {
    display: block;
    margin: 0 auto;
    font-size: 3rem;
    text-align: center;
    width: 7ch;
    padding: 0.125rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background-color: var(--color-background-soft);
    box-shadow: 0 0 0 0 var(--color-primary);
    color: inherit;
    outline: none;
    transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
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