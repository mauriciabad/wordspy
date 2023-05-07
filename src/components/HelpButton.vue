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
  <IconButton class="button button--help-modal" @click="showHelpModal = true">
    <template #icon><QuestionMarkCircleIcon /></template>
    {{ t('ui.help') }}
    <HelpModal v-model:modelValue="showHelpModal" />
  </IconButton>
</template>

<style lang="scss">
.link {
  display: inline-block;
  padding: 0.5rem 1.125rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
  box-shadow: 0 0 0 0 var(--color-primary);
  cursor: pointer;
  font-size: 1rem;
  justify-self: center;
  outline: none;
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--color-primary);
  }

  > svg {
    display: inline-block;
    height: 20px;
    margin-right: 0.5rem;
    vertical-align: -0.25em;
  }

  &--main {
    position: sticky;
    right: 0;
    bottom: 0;
    left: 0;
    width: calc(100% + 2 * var(--main-padding, 1rem));
    max-width: calc(var(--max-width, 30rem) + 2rem);
    padding: 0.75rem 0.5rem;
    border: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    margin: calc(-1 * var(--main-padding, 1rem));
    margin-top: 1rem;
    background-color: var(--color-primary);
    box-shadow: 0 0 16px 0 rgb(0 0 0 / 20%);
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    > svg {
      height: 24px;
    }

    &:focus-visible {
      box-shadow: 0 0 0 3px var(--color-text);
    }

    @media (max-width: 32rem) {
      border-radius: 0;
    }
  }
}
</style>
