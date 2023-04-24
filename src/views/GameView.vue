<script setup lang="ts">
import { useDataTranslations } from '@/compositions/useDataTranslations'
import { useRouterHelper } from '@/compositions/useRouterHelper'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomLayout from '@/components/CustomLayout.vue'
import { useWordTranslations } from '@/compositions/useWordTranslations'

const { t } = useI18n()

const { getName, getDescription } = useDataTranslations()

const { getQueryParam } = useRouterHelper()

const hasData = computed<boolean>(
  () =>
    getQueryParam('wordId') !== undefined ||
    getQueryParam('wordSetId') !== undefined ||
    getQueryParam('roleId') !== undefined
)
const { getWordSet } = useWordTranslations()

const roleId = computed<string | undefined>(() => getQueryParam('roleId'))
const wordSetId = computed<string | undefined>(() => getQueryParam('wordSetId'))
const wordId = computed<string | undefined>(() => getQueryParam('wordId'))
const wordSet = computed(() => getWordSet(Number(wordSetId.value) ?? 0))
const word = computed<string | undefined>(
  () => wordSet.value.words[Number(wordId.value) ?? 0]
)

const role = computed<string>(() => {
  switch (roleId.value) {
    case '1':
      return t('ui2.role.potato')
    case '2':
      return t('ui2.role.beetroot')
    case '3':
      return t('ui2.role.rottenTurnip')
    default:
      return 'Unknown role'
  }
})
</script>

<template>
  <CustomLayout locale-selector>
    <template v-if="hasData">
      <h1 class="word">{{ roleId === '2' ? '???' : word }}</h1>

      <h2 class="role" :class="[`role--${roleId}`]">
        {{ t(`ui2.roles.${roleId}.name`) }}
      </h2>
      <p class="description">{{ t(`ui2.roles.${roleId}.description`) }}</p>
    </template>

    <template v-else> No data </template>
  </CustomLayout>
</template>

<style scoped lang="scss">
.word {
  font-size: 4rem;
}

.role {
  margin-top: 3rem;

  &--1 {
    color: lightseagreen;
  }

  &--2 {
    color: royalblue;
  }

  &--3 {
    color: crimson;
  }
}
</style>
