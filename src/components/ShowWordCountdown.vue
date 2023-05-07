<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <div v-if="!disabled" class="wrapper">
    <slot />
    <div class="overlay">
      <h2 class="overlay__title">Showing word in...</h2>
      <span class="overlay__numbers">
        <span class="overlay__number overlay__number--3">3</span>
        <span class="overlay__number overlay__number--2">2</span>
        <span class="overlay__number overlay__number--1">1</span>
        <span class="overlay__number overlay__number--0">Let's go!</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  position: relative;
}

.overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  inset: 0;

  &__numbers {
    position: relative;
  }

  &__number {
    $time-difference: 1s;

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: show-number 1.5s linear;
    inset: 0;

    &--3 {
      animation-delay: calc(0 * #{$time-difference});
    }

    &--2 {
      animation-delay: calc(1 * #{$time-difference});
    }

    &--1 {
      animation-delay: calc(2 * #{$time-difference});
    }

    &--0 {
      animation-delay: calc(3 * #{$time-difference});
    }
  }
}
</style>
