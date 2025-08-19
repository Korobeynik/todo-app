<template>
  <div v-if="currentPage === 'login'" class="login-form-container">
    <h1 class="login-title">Login</h1>
    <p class="login-subtitle">Enter your username and phone number to continue.</p>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model.trim="username"
          @input="handleUsernameInput"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone number</label>
        <input type="text" id="phone" v-model.trim="phone" required placeholder="+380..." />
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>

      <button type="submit" :disabled="isLoading" class="login-button">
        {{ isLoading ? 'Loading...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
const phone = ref('')
const error = ref('')
const isLoading = ref(false)

const currentPage = ref('login')
const emit = defineEmits(['login-success'])

const handleUsernameInput = () => {
  error.value = ''
}

const handleLogin = async () => {
  error.value = ''

  if (!username.value || !phone.value) {
    error.value = 'All fields are required.'
    return
  }

  const phoneRegex = /^\+?[0-9]{10,15}$/
  if (!phoneRegex.test(phone.value)) {
    error.value = 'Please enter a valid phone number.'
    return
  }

  try {
    isLoading.value = true

    await new Promise((resolve) => setTimeout(resolve, 1000))

    emit('login-success', { username: username.value, phone: phone.value })

    username.value = ''
    phone.value = ''
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #666;
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
}

.error-message {
  color: #d9534f;
  margin-bottom: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.8rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
}
</style>
