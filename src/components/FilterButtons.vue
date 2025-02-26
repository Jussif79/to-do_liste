<template>
  <div class="filters">
    <button @click="setFilter('all')">All Tasks</button>
    <button @click="setFilter('todo')">To Do</button>
    <button @click="setFilter('completed')">Completed</button>
    <button @click="setFilter('priority')">Priority</button>
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
.filters button {
  margin-right: 10px;
}
</style>