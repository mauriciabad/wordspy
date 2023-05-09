<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomModal from '@/components/CustomModal.vue'
import IconButton from '@/components/IconButton.vue'
import TagList from '@/components/TagList.vue'
import { useWordTranslations } from '@/compositions/useWordTranslations'
import { getLocaleInfo } from '@/i18n'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()

const showModal = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const { wordSets } = useWordTranslations()
</script>

<template>
  <CustomModal v-model="showModal">
    <template #title>
      <h1 class="title">{{ t('ui.wordSetDetails') }}</h1>
    </template>

    <p class="desc">{{ t('ui.wordSetDetailsDescription') }}</p>

    <div v-for="wordSet in wordSets" :key="wordSet.id" class="word-set">
      <h2>{{ wordSet.name }}</h2>

      <p>{{ wordSet.description }}</p>

      <div class="separator" />

      <p class="lang">
        {{
          t('ui.wordSetBadLanguageShort', {
            languages: wordSet.bestPlayedWith
              .map((lang) => getLocaleInfo(lang).name)
              .join(', '),
          })
        }}
      </p>

      <div class="separator" />

      <h3>{{ t('ui.words') }}</h3>
      <TagList :items="wordSet.words" class="word-list" />
    </div>

    <template #footer="{ close }">
      <IconButton @click="close">
        <template #icon> <XIcon /> </template>{{ t('ui.close') }}
      </IconButton>
    </template>
  </CustomModal>
</template>

<style lang="scss">
.title {
  margin: 0;
  font-size: 1.5rem;
}

h2 {
  margin: -0.3em 0 0;
  color: var(--color-heading);
  font-size: 1.5rem;
  font-weight: 700;
}

h3 {
  margin: 0.5rem 0;
  color: var(--color-heading-soft);
  font-size: 1.2rem;
  font-weight: 600;
}

.word-list {
  justify-content: start;
}

.separator {
  width: 2rem;
  height: 1px;
  margin: 0.75rem auto;
  background: var(--color-border);
}

.lang {
}

.word-set {
  padding: 1rem;
  border: solid 1px var(--color-border);
  border-radius: 1rem;
  margin: 1rem 0;
  text-align: center;
}

.desc {
  text-align: center;
}
</style>
