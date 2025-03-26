<template>
  <div class="my-4">
    <input 
      v-model="searchQuery" 
      placeholder="Search tasks..." 
      class="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
