<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/outline'
import { ref } from 'vue'
import IconButton from '@/components/IconButton.vue'
import WordSetModal from '@/components/WordSetModal.vue'

const showWordSetModal = ref<boolean>(false)
</script>

<template>
  <IconButton big @click="showWordSetModal = true">
    <template #icon><InformationCircleIcon /></template>
    <WordSetModal v-model:modelValue="showWordSetModal" />
  </IconButton>
</template>
