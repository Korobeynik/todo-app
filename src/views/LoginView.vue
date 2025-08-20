<script setup lang="ts">
import { watch } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

const { user } = useUserStore()
const router = useRouter()

watch(user, (newUser) => {
  if (newUser) {
    router.push('/todos')
  }
})
</script>

<template>
  <div class="login-page-bg app-container">
    <LoginForm />
  </div>
</template>

<style scoped>
.login-page-bg {
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  margin: auto;
  margin-top: 30%;
  transform: translateY(-50%);
}

.app-container {
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
}

@media (max-width: 640px) {
  .app-container {
    padding: 1.5rem;
  }
}
</style>
