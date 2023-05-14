<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/outline'
import { ref } from 'vue'
import IconButton from '@/components/IconButton.vue'
import WordSetModal from '@/components/WordSetModal.vue'
import { useI18n } from 'vue-i18n'

const showWordSetModal = ref<boolean>(false)

const { t } = useI18n()
</script>

<template>
  <IconButton
    big
    :title="t('ui.wordSetDetails')"
    :aria-label="t('ui.wordSetDetails')"
    @click="showWordSetModal = true"
  >
    <template #icon><InformationCircleIcon /></template>
    <WordSetModal v-model:modelValue="showWordSetModal" />
  </IconButton>
</template>
