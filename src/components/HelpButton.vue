<script setup lang="ts">
import { useRouterHelper } from '@/compositions/useRouterHelper'
import { QuestionMarkCircleIcon } from '@heroicons/vue/solid'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import IconButton from '@/components/IconButton.vue'
import HelpModal from '@/components/HelpModal.vue'

const { t } = useI18n()
const { getQueryParam } = useRouterHelper()
const router = useRouter()

const showHelpModal = ref<boolean>(false)
if (getQueryParam('showHelpModal', ['true']) === 'true')
  showHelpModal.value = true

watch(showHelpModal, () => {
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      showHelpModal: showHelpModal.value ? 'true' : undefined,
    },
  })
})
</script>

<template>
  <IconButton @click="showHelpModal = true">
    <template #icon><QuestionMarkCircleIcon /></template>
    {{ t('ui.help') }}
    <HelpModal v-model:modelValue="showHelpModal" />
  </IconButton>
</template>
