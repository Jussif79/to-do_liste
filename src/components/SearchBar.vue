<template>
    <input v-model="searchQuery" placeholder="Search tasks..." />
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