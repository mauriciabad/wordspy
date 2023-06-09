<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  disabled?: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <div class="wrapper" aria-hidden="true">
    <slot />
    <div v-if="!disabled" class="overlay">
      <div class="overlay__circle" />
      <h2 class="overlay__title">{{ t('ui.countdown.title') }}</h2>
      <span class="overlay__numbers">
        <span class="overlay__number overlay__number--3">
          {{ t('ui.countdown.3') }}
        </span>
        <span class="overlay__number overlay__number--2">
          {{ t('ui.countdown.2') }}
        </span>
        <span class="overlay__number overlay__number--1">
          {{ t('ui.countdown.1') }}
        </span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';

.wrapper {
  position: relative;
}

.overlay {
  $number-font-size: 10rem;

  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: hide-overlay 4.75s ease-in-out;
  background: var(--color-background);
  inset: 0;
  opacity: 0;
  pointer-events: none;

  &__circle {
    position: fixed;
    z-index: -1;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    inset: 0;

    &::before {
      width: 1vmax;
      height: 1vmax;
      border-radius: 100%;
      animation: circle 4s linear;
      background: var(--color-primary);
      content: '';
      opacity: 0.1;
      transform: scale(0);
    }
  }

  &__numbers {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 10rem;
    margin-bottom: 8rem;
    font-weight: 200;
    line-height: 1;
  }

  &__number {
    $time-difference: 1.25s;

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: show-number-opacity 1.66s linear,
      show-number-scale 2s cubic-bezier(0.22, 0.61, 0.36, 1);
    font-size: $number-font-size;
    inset: 0;
    opacity: 0;
    transform: scale(1.25);

    &--3 {
      animation-delay: calc(0 * #{$time-difference} + 0.25s);
    }

    &--2 {
      animation-delay: calc(1 * #{$time-difference} + 0.25s);
    }

    &--1 {
      animation-delay: calc(2 * #{$time-difference} + 0.25s);
    }
  }
}

@keyframes hide-overlay {
  0% {
    opacity: 1;
  }
  #{math.div(4, 4.75)*100 + '%'} {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes show-number-scale {
  0% {
    transform: scale(0.25);
  }

  100% {
    transform: scale(1.25);
  }
}

@keyframes circle {
  0% {
    transform: scale(100);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes show-number-opacity {
  0% {
    opacity: 0;
  }

  2% {
    opacity: 0.23;
  }

  6% {
    opacity: 0.49;
  }

  10% {
    opacity: 0.69;
  }

  14% {
    opacity: 0.82;
  }

  19% {
    opacity: 0.92;
  }

  23% {
    opacity: 0.97;
  }

  27% {
    opacity: 0.99;
  }

  30% {
    opacity: 1;
  }

  35% {
    opacity: 0.98;
  }

  42% {
    opacity: 0.92;
  }

  48% {
    opacity: 0.81;
  }

  53% {
    opacity: 0.66;
  }

  59% {
    opacity: 0.48;
  }

  67% {
    opacity: 0.29;
  }

  75% {
    opacity: 0.15;
  }

  82% {
    opacity: 0.06;
  }

  90% {
    opacity: 0.01;
  }

  100% {
    opacity: 0;
  }
}
</style>
