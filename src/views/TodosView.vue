<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTodosStore } from '../stores/todos'
import { useUserStore } from '../stores/user'
import TodoFilters from '../components/TodoFilters.vue'
import TodoItem from '../components/TodoItem.vue'
import TodoCreate from '../components/TodoCreate.vue'
import Modal from '../components/AddTaskModal.vue'

const { user, logout } = useUserStore()

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

const { getTodos, filteredTodos, isLoading, error, loadFavorites } = useTodosStore()

onMounted(() => {
  loadFavorites()
  getTodos()
})
</script>

<template>
  <div class="todo-page-container">
    <Modal :is-open="isModalOpen" @close="closeModal">
      <TodoCreate @task-added="closeModal" />
    </Modal>
    <header class="page-header">
      <div class="user-info">
        <h2>Hello, {{ user?.username }}!</h2>
        <p>Welcome to your to-do list.</p>
        <div class="user-details">
          <p><strong>Name:</strong> {{ user?.name }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
          <p><strong>Phone:</strong> {{ user?.phone }}</p>
        </div>
      </div>
      <button @click="openModal" class="add-new-task-button add-button">Add new task</button>
      <button @click="logout" class="logout-button">Logout</button>
    </header>

    <hr class="separator" />

    <main class="todo-main">
      <h3 class="section-title">Tasks list</h3>
      <TodoFilters />

      <p v-if="isLoading" class="loading-message">Loading tasks...</p>
      <p v-else-if="error" class="error-message">{{ error }}</p>
      <p v-else-if="filteredTodos.length === 0" class="no-results">No tasks match your criteria.</p>
      <ul v-else class="todo-list">
        <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
      </ul>
    </main>

    <hr class="separator" />
  </div>
</template>

<style scoped>
.todo-page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: white;
  padding: 30px;
  border-radius: 10px;
}

.page-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}
button.add-new-task-button.add-button {
  margin-left: auto;
}

@media (min-width: 640px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .todo-page-container {
    padding: 10px;
  }

  button.add-new-task-button.add-button {
    margin-left: 0;
    width: 100%;
  }
  .logout-button {
    width: 100%;
  }
}

.user-info h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.user-info p {
  font-size: 0.875rem;
  color: #6b7280;
}

.user-details {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.user-details strong {
  font-weight: 600;
  color: #1f2937;
}

.logout-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background-color: #ef4444;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #dc2626;
}

.separator {
  border: 1px solid #e5e7eb;
  margin: 0;
}

.todo-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.loading-message,
.no-results {
  text-align: center;
  color: #6b7280;
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

.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
