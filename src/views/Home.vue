<template>
  <div class="home">
    <h1>Todo App</h1>

    <!-- Filter Buttons -->
    <FilterButtons />

    <!-- Search -->
    <SearchBar />

    <!-- Categories -->
    <CategoryList />

    <!-- Tasks -->
    <TaskList />
  </div>
</template>

<script setup>
import FilterButtons from '@/components/FilterButtons.vue';
import SearchBar from '@/components/SearchBar.vue';
import CategoryList from '@/components/CategoryList.vue';
import TaskList from '@/components/TaskList.vue';
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>