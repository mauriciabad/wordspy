<script lang="ts" setup>
import { computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

const props = defineProps<{
  modelValue: number
  options: { value: number; name: string }[]
  id?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const selectedOption = computed(() =>
  props.options.find((v) => v.value === props.modelValue)
)
const inputId = computed<string>(() => props.id ?? 'selector')
</script>

<template>
  <label class="selector" :for="inputId">
    <span class="selector__name">{{ selectedOption?.name }}</span>
    <ChevronDownIcon class="selector__arrow" />
    <select
      :id="inputId"
      :value="modelValue"
      class="selector__input"
      @input="
        emit(
          'update:modelValue',
          Number(($event.target as HTMLSelectElement)?.value)
        )
      "
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </label>
</template>

<style lang="scss" scoped>
.selector {
  position: relative;
  display: inline-flex;
  width: 100%;
  max-width: 9rem;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  appearance: none;
  background-color: var(--color-background-soft);
  box-shadow: 0 0 0 0 var(--color-primary);
  color: var(--color-text);
  text-align: left;
  transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &:focus-within {
    box-shadow: 0 0 0 3px var(--color-primary);
  }

  &__input {
    position: absolute;
    z-index: 1;
    width: 100%;
    border-radius: inherit;
    cursor: pointer;
    inset: 0;
    opacity: 0;
  }

  &__name {
    flex: 1 1 0;
    line-height: 1;
  }

  &__arrow {
    height: 20px;
  }
}
</style>
