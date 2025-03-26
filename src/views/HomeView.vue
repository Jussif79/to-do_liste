<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-1/4 p-4 bg-white shadow-md h-screen">
      <FilterButtons />
      <CategoryList />
    </aside>

    <!-- Main Content -->
    <main class="w-3/4 p-6">
      <SearchBar />
      <TaskList />
    </main>
  </div>
</template>

<script setup>
import FilterButtons from "@/components/FilterButtons.vue";
import SearchBar from "@/components/SearchBar.vue";
import CategoryList from "@/components/CategoryList.vue";
import TaskList from "@/components/TaskList.vue";
</script>
