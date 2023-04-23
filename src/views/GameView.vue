<script setup lang="ts">
import { useDataTranslations } from '@/compositions/useDataTranslations'
import { useRouterHelper } from '@/compositions/useRouterHelper'
import { getAbility } from '@/data/abilities'
import type { Ability, CustomAbility } from '@/data/abilities.types'
import { getCharacter } from '@/data/characters'
import type { Character, CustomCharacter } from '@/data/characters.types'
import { isCharacterId, isCustomCharacterId } from '@/data/characters.types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IlustrationImg from '@/components/IlustrationImg.vue'
import CustomLayout from '@/components/CustomLayout.vue'

const { t } = useI18n()

const { getName, getDescription } = useDataTranslations()

const { getQueryParam } = useRouterHelper()

const hasData = computed<boolean>(
  () =>
    getQueryParam('wordId') !== undefined ||
    getQueryParam('setId') !== undefined ||
    getQueryParam('roleId') !== undefined
)

const roleId = computed<string | undefined>(() => getQueryParam('roleId'))
const setId = computed<string | undefined>(() => getQueryParam('setId'))
const wordId = computed<string | undefined>(() => getQueryParam('wordId'))

const role = computed<string>(() => {
  switch (roleId.value) {
    case "1": return t("ui2.role.potato")
    case "2": return t("ui2.role.beetroot")
    case "3": return t("ui2.role.rawTurnip")
    default: return "Unknown role"
  }
})

</script>

<template>
  <CustomLayout locale-selector>
    <template v-if="hasData">

          <h1>{{ role }}</h1>
        
      </template>

    <template v-else>
      No data
    </template>
  </CustomLayout>
</template>

<style scoped lang="scss">
.name {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.ilustration {
  --size: 100%;

  display: inline-block;
  width: 100%;
  max-width: var(--size);
  padding: 1rem;
  border: 1px solid var(--vt-c-divider-light-2);
  border-radius: 1rem;
  aspect-ratio: 1;
  background-color: #fff;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 10%),
    0 8px 10px -6px rgb(0 0 0 / 10%);
  cursor: pointer;
  object-fit: contain;

  &--ability {
    --size: 5rem;

    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  &--character {
    --size: #{5rem * 2 + 1rem};
  }
}

.ability-ilustrations-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
}

h1 {
  margin-top: 0.5rem;
}

h2 {
  margin-top: 2rem;
}

strong {
  font-weight: bold;
}

.creation-date {
  position: sticky;
  top: 100%;
  bottom: 0;
  left: 0;
  padding-top: 2rem;
  font-size: 0.85rem;
}

.error-explanation {
  margin-top: 2rem;
}

.error-list {
  padding: 1rem;
  padding-left: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-top: 1rem;
  background-color: var(--color-background-soft);
  color: var(--color-red);
  text-align: left;
}
</style>
