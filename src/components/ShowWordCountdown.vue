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
        <span class="overlay__number overlay__number--0">
          {{ t('ui.countdown.0') }}
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
  animation: hide-overlay 5.25s ease-in-out;
  background: var(--color-background);
  inset: 0;
  opacity: 0;
  pointer-events: none;

  &::before {
    position: absolute;
    z-index: -1;
    border-radius: 100%;
    animation: circle 4s linear;
    background: var(--color-primary);
    content: '';
    inset: calc(50% - 50vmax) calc(50% - 50vmax);
    opacity: 0.05;
    transform: scale(0);
    transform-origin: center center;
  }

  &__numbers {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 10rem;
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

    &--0 {
      animation: show-number-opacity-2 10s ease-out,
        show-number-scale 1.25s cubic-bezier(0.18, 0.89, 0.46, 1.55);
      animation-delay: calc(3 * #{$time-difference} + 0.25s);
      font-size: $number-font-size * 0.33;
      font-weight: 300;
    }
  }
}

@keyframes hide-overlay {
  0% {
    opacity: 1;
  }
  #{math.div(4.5, 5.25)*100 + '%'} {
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
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes show-number-opacity-2 {
  0% {
    opacity: 0;
  }

  #{math.div(0.5, 10)*100 + '%'} {
    opacity: 1;
  }

  100% {
    opacity: 1;
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
