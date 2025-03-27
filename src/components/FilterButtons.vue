<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-purple-700">Filter</h2>
    <div class="mt-3 space-y-2">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="setFilter(filter.value)"
        class="w-full px-4 py-2 border rounded-lg hover:bg-purple-200 focus:outline-2 focus:outline-purple-500"
        :class="{ 'bg-gray-300': todoStore.currentFilter === filter.value }"
      >
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from "@/stores/todoStore";
const todoStore = useTodoStore();

const filters = [
  { label: "All Tasks", value: "all" },
  { label: "To Do", value: "todo" },
  { label: "Completed", value: "completed" },
  { label: "Priority", value: "priority" },
];

const setFilter = (filter) => {
  todoStore.setFilter(filter);
};
</script>
