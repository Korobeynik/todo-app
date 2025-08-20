<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore } from '../stores/todos'

const { addTodo } = useTodosStore()

const newTodoTitle = ref('')
const newTodoUserId = ref('')

const handleAddTodo = () => {
  if (!newTodoTitle.value || !newTodoUserId.value) {
    return
  }

  addTodo({
    title: newTodoTitle.value,
    userId: parseInt(newTodoUserId.value, 10),
    completed: false,
  })

  newTodoTitle.value = ''
  newTodoUserId.value = ''
}
</script>

<template>
  <div class="create-todo-block">
    <h3 class="section-title">Great new task</h3>
    <div class="create-form">
      <input type="number" v-model="newTodoUserId" placeholder="User ID" />
      <input type="text" v-model="newTodoTitle" placeholder="Title" />
      <button @click="handleAddTodo" class="add-button">Add</button>
    </div>
  </div>
</template>

<style scoped>
.create-todo-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.create-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .create-form {
    grid-template-columns: 1fr 1fr auto;
  }
}

.create-form input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.create-form input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.create-form button {
  width: 100%;
  padding: 0.625rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #2563eb;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-form button:hover {
  background-color: #1e40af;
}

@media (min-width: 640px) {
  .create-form button {
    width: auto;
  }
}
</style>
