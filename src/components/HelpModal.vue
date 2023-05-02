<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'
import markdownItVue from 'markdown-it-vue'
import { useI18n } from 'vue-i18n'
import CustomModal from '@/components/CustomModal.vue'
import IconButton from '@/components/IconButton.vue'

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
</script>

<template>
  <CustomModal v-model="showModal">
    <template #title>{{ t('help.title') }} </template>

    <markdownItVue class="md md--manual" :content="t('help.appManual')" />
    <markdownItVue class="md md--rules" :content="t('help.rules')" />

    <template #footer="{ close }">
      <IconButton @click="close">
        <template #icon> <XIcon /> </template>{{ t('ui.close') }}
      </IconButton>
    </template>
  </CustomModal>
</template>
