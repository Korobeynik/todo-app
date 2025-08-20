<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { ref } from 'vue'

const { login, isLoading, error } = useUserStore()

const username = ref('')
const phone = ref('')

const handleLogin = () => {
  login(username.value, phone.value)
}
</script>

<template>
  <div class="login-form-container">
    <h1 class="login-title">Login</h1>
    <p class="login-subtitle">Enter your username and phone number to continue.</p>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">User name</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone number</label>
        <input type="text" id="phone" v-model="phone" required />
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <button type="submit" :disabled="isLoading" class="login-button">
        {{ isLoading ? 'Loading...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.login-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form-group input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
  background-color: #fef2f2;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-weight: 500;
}

.login-button {
  width: 100%;
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #4f46e5;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover:not(:disabled) {
  background-color: #4338ca;
}

.login-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
