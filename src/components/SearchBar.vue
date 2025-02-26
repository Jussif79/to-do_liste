<template>
  <div class="search-bar">
    <input 
      v-model="searchQuery" 
      placeholder="Search tasks..." 
      class="search-input"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTodoStore } from '@/stores/todoStore';

const todoStore = useTodoStore();
const searchQuery = ref('');

watch(searchQuery, (newQuery) => {
  todoStore.searchQuery = newQuery;
});
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>