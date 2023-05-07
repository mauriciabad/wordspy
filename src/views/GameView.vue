<script setup lang="ts">
import { useRouterHelper } from '@/compositions/useRouterHelper'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomLayout from '@/components/CustomLayout.vue'
import { useWordTranslations } from '@/compositions/useWordTranslations'
import { ROLE_IDS } from '@/data/roles'
import HelpButton from '@/components/HelpButton.vue'

const { t } = useI18n()

const { getQueryParam } = useRouterHelper()

const roleId = getQueryParam('roleId', ROLE_IDS)
const wordSetId = getQueryParam('wordSetId', [], true)
const wordId = getQueryParam('wordId', [], true)

const hasData = computed<boolean>(
  () => wordId !== undefined || wordSetId !== undefined || roleId !== undefined
)
const { getWordSet } = useWordTranslations()

const wordSet = getWordSet(wordSetId ?? 1)
const word = computed<string | undefined>(() =>
  wordId === undefined || wordSet.value === undefined
    ? undefined
    : wordSet.value.words[wordId]
)
</script>

<template>
  <CustomLayout locale-selector new-game-button>
    <HelpButton class="help-button" />

    <div style="flex-grow: 1"></div>
    <template v-if="hasData">
      <h1 class="word">
        {{ roleId === 'spy' ? t(`ui.hiddenWord`) : word }}
      </h1>

      <h2 class="role" :class="[`role--${roleId}`]">
        {{ t(`ui.roles.${roleId}.name`) }}
      </h2>
      <p class="description">{{ t(`ui.roles.${roleId}.description`) }}</p>
    </template>

    <template v-else>
      <h1>{{ t('ui.errors.wrongGameUrl.name') }}</h1>
      <p>{{ t('ui.errors.wrongGameUrl.details') }}</p>
    </template>
    <div style="flex-grow: 1"></div>
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
</style>
