<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'
import ToastNotification from './components/ToastNotification.vue'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  if (!userStore.isLoggedIn()) {
    router.push('/')
  }
})
</script>

<template>
  <div class="main-layout">
    <router-view />
    <ToastNotification />
  </div>
</template>

<style scoped>
.main-layout {
  position: relative;
  min-height: 100vh;
  width: 100%;
  max-width: 960px;
  display: flex;
}
</style>
