<script setup lang="ts">
import { useTodosStore } from '../stores/todos'
import type { Todo } from '../types/index'

const { toggleFavorite, favorites } = useTodosStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  todo: Todo
}>()
</script>

<template>
  <li class="todo-item">
    <div class="todo-details">
      <p class="todo-title" :class="{ completed: todo.completed }">{{ todo.title }}</p>
      <p class="todo-user-id">User ID: {{ todo.userId }}</p>
    </div>
    <div class="todo-actions">
      <span
        class="status-badge"
        :class="{ completed: todo.completed, uncompleted: !todo.completed }"
      >
        {{ todo.completed ? 'Completed' : 'Unfinished' }}
      </span>
      <button @click="toggleFavorite(todo.id)" class="favorite-button">
        <svg
          :class="{ 'is-favorite': favorites.includes(todo.id) }"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.todo-details {
  flex: 1;
  min-width: 0;
}

.todo-title {
  font-weight: 500;
  color: #1f2937;
}

.todo-title.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-user-id {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.completed {
  background-color: #d1fae5;
  color: #065f46;
}

.status-badge.uncompleted {
  background-color: #fee2e2;
  color: #991b1b;
}

.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.favorite-button svg {
  height: 1.5rem;
  width: 1.5rem;
  color: #9ca3af;
  transition: color 0.3s ease;
}

.favorite-button:hover svg {
  color: #eab308;
}

.favorite-button svg.is-favorite {
  fill: #eab308;
}
</style>
