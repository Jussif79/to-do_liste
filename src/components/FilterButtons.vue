<template>
  <div class="filters">
    <div class="filter-row">
      <button 
        @click="setFilter('all')" 
        :class="{ active: todoStore.currentFilter === 'all' }"
      >
        All Tasks
      </button>
      <button 
        @click="setFilter('todo')" 
        :class="{ active: todoStore.currentFilter === 'todo' }"
      >
        To Do
      </button>
    </div>
    <div class="filter-row">
      <button 
        @click="setFilter('completed')" 
        :class="{ active: todoStore.currentFilter === 'completed' }"
      >
        Completed
      </button>
      <button 
        @click="setFilter('priority')" 
        :class="{ active: todoStore.currentFilter === 'priority' }"
      >
        Priority
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todoStore';

const todoStore = useTodoStore();

const setFilter = (filter) => {
  todoStore.setFilter(filter);
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  gap: 10px;
}

.filters button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background-color: #f0f0f0;
  color: #333;
  transition: background-color 0.3s ease;
  flex: 1; /* Ensure buttons take equal width */
}

.filters button:hover {
  background-color: #ddd;
}

.filters button.active {
  background-color: #007bff;
  color: white;
}
</style>