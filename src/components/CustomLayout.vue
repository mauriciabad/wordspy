<script lang="ts" setup>
import LocaleSelector from '@/components/LocaleSelector.vue'
import { ChevronLeftIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps<{
  localeSelector?: boolean
  backButton?: boolean
}>()

const { t } = useI18n()

const router = useRouter()
</script>

<template>
  <div class="wrapper">
    <div class="header" :class="{ 'header--no-go-back': !backButton }">
      <button v-if="backButton" class="go-back" @click="router.back()">
        <div class="go-back__icon-wrapper">
          <ChevronLeftIcon class="go-back__icon" />
        </div>
        <span class="go-back__text">{{ t('ui.goBack') }}</span>
      </button>
      <LocaleSelector v-if="localeSelector" />
    </div>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  max-width: 34rem;
  min-height: var(--vh100);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  gap: 1rem;
  text-align: center;
}

.content {
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.header {
  position: relative;
  display: flex;
  width: 100%;
  max-width: var(--max-width, 30rem);
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin: 0 auto;

  &--no-go-back {
    justify-content: center;
  }
}

.go-back {
  $size: 2.5rem;

  display: inline-block;
  border: 0;
  background: none;
  color: var(--color-text);
  cursor: pointer;
  outline: none;

  &__icon-wrapper {
    display: inline-block;
    width: $size;
    height: $size;
    padding: 0.5rem;
    border-radius: 100%;
    background-color: var(--color-background-mute);
    box-shadow: 0 0 0 0 var(--color-primary);
    transition: box-shadow 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    vertical-align: middle;
  }

  &:focus-visible &__icon-wrapper {
    box-shadow: 0 0 0 3px var(--color-primary);
  }

  &__icon {
    display: inline-block;
    color: var(--color-text-mute);
  }

  &__text {
    display: inline-block;
    margin-left: 0.5rem;
    color: var(--color-text-mute);
    font-size: 1rem;
  }
}
</style>
