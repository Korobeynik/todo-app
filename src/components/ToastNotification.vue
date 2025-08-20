<script setup lang="ts">
import { useToastStore } from '../stores/toast'

const { message, isVisible } = useToastStore()
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="toast-notification">
      <p>{{ message }}</p>
    </div>
  </Transition>
</template>

<style scoped>
.toast-notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2c3e50;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
