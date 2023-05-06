<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'
import Markdown from 'vue3-markdown-it'
import { useI18n } from 'vue-i18n'
import CustomModal from '@/components/CustomModal.vue'
import IconButton from '@/components/IconButton.vue'
import MarkdownItAttrs from 'markdown-it-attrs'

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
    <template #title>
      <h1 class="title">{{ t('help.title') }}</h1>
    </template>

    <Markdown
      class="md"
      :source="t('help.content')"
      :plugins="[{ plugin: MarkdownItAttrs }]"
    />

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

.md {
  text-align: left;

  h1,
  h2 {
    margin: 1.5rem 0 0;
    color: var(--color-heading);
    font-size: 1.5rem;
    font-weight: 500;
  }

  h3,
  h4,
  h5 {
    margin: 0.5rem 0 0;
    color: var(--color-role-none);
    font-weight: 700;
  }

  .color-role-normal {
    color: var(--color-role-normal);
  }

  .color-role-spy {
    color: var(--color-role-spy);
  }

  .color-role-chaos {
    color: var(--color-role-chaos);
  }

  h1 + h1,
  h1 + h2,
  h1 + h3,
  h1 + h4,
  h1 + h5,
  h2 + h1,
  h2 + h2,
  h2 + h3,
  h2 + h4,
  h2 + h5,
  h3 + h1,
  h3 + h2,
  h3 + h3,
  h3 + h4,
  h3 + h5,
  h4 + h1,
  h4 + h2,
  h4 + h3,
  h4 + h4,
  h4 + h5,
  h5 + h1,
  h5 + h2,
  h5 + h3,
  h5 + h4,
  h5 + h5,
  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child {
    margin: 0;
  }

  ul,
  ol {
    padding-left: 1.5rem;
  }

  p:not(h1 + p, h2 + p, h3 + p, h4 + p),
  ol > li {
    margin: 0.5rem 0 0;
  }
}
</style>
