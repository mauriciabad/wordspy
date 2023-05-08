<script setup lang="ts">
import { useRouterHelper } from '@/compositions/useRouterHelper'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomLayout from '@/components/CustomLayout.vue'
import { useWordTranslations } from '@/compositions/useWordTranslations'
import { ROLE_IDS } from '@/data/roles'
import HelpButton from '@/components/HelpButton.vue'
import ShowWordCountdown from '@/components/ShowWordCountdown.vue'

const { t } = useI18n()

const { getQueryParam } = useRouterHelper()

const roleId = getQueryParam('roleId', ROLE_IDS)
const wordSetId = getQueryParam('wordSetId', [], true)
const wordId = getQueryParam('wordId', [], true)

const { getWordSet } = useWordTranslations()

const wordSet = getWordSet(wordSetId)
const word = computed<string | undefined>(() =>
  wordId === undefined || wordSet.value === undefined
    ? undefined
    : wordSet.value.words[wordId]
)

const hasData = computed<boolean>(
  () => word.value !== undefined && roleId !== undefined
)

const isTesting = import.meta.env.MODE === 'testing'
</script>

<template>
  <CustomLayout locale-selector new-game-button>
    <HelpButton class="help-button" />
    <div class="wrapper">
      <ShowWordCountdown v-if="hasData" :disabled="isTesting">
        <h1 class="word">
          {{ roleId === 'spy' ? t(`ui.hiddenWord`) : word }}
        </h1>

        <h2 class="role" :class="[`role--${roleId}`]">
          {{ t(`ui.roles.${roleId}.name`) }}
        </h2>
        <p class="description">{{ t(`ui.roles.${roleId}.description`) }}</p>
      </ShowWordCountdown>

      <template v-else>
        <h1>{{ t('ui.errors.wrongGameUrl.name') }}</h1>
        <p>{{ t('ui.errors.wrongGameUrl.details') }}</p>
      </template>
    </div>
  </CustomLayout>
</template>

<style scoped lang="scss">
.word {
  font-size: 4rem;
}

.role {
  margin-top: 3rem;

  &--normal {
    color: var(--color-role-normal);
  }

  &--spy {
    color: var(--color-role-spy);
  }

  &--chaos {
    color: var(--color-role-chaos);
  }
}

.help-button {
  margin-top: -1.5rem;
}

.wrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}
</style>
