<script setup lang="ts">
import { useTodosStore } from '../stores/todos'

const { filterStatus, filterUserId, searchQuery, uniqueUserIds } = useTodosStore()

const resetFilters = () => {
  filterStatus.value = 'All'
  filterUserId.value = 'All Users'
  searchQuery.value = ''
}
</script>

<template>
  <div class="filters-and-search">
    <div class="filter-group">
      <label for="status-filter">Filter by Status</label>
      <select id="status-filter" v-model="filterStatus">
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Uncompleted">Uncompleted</option>
        <option value="Favorites">Favorites</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="user-id-filter">Filter by User ID</label>
      <select id="user-id-filter" v-model="filterUserId">
        <option value="All Users">All Users</option>
        <option v-for="id in uniqueUserIds" :key="id" :value="id">
          {{ id }}
        </option>
      </select>
    </div>
    <div class="filter-group search-input">
      <label for="search">Search by title</label>
      <input type="text" id="search" v-model="searchQuery" placeholder="Enter text to search..." />
    </div>
    <div class="filter-group"><button @click="resetFilters">Reset Filters</button></div>
  </div>
</template>

<style scoped>
.filters-and-search {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .filters-and-search {
    grid-template-columns: repeat(4, 1fr);
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.filter-group select,
.filter-group input {
  width: 100%;
  height: 36px;
  padding-right: 20px;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.filter-group select:focus,
.filter-group input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}
.filter-group button {
  margin-top: auto;
  max-height: 36px;
}
</style>
