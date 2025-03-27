<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile layout -->
    <div class="lg:hidden">
      <aside class="w-full p-4 bg-white shadow-md">
        <FilterButtons />
        <CategoryList />
      </aside>
      <main class="w-full p-6">
        <SearchBar />
        <TaskList />
      </main>
    </div>

    <!-- Desktop layout -->
    <div class="hidden lg:flex">
      <aside class="w-1/4 p-4 bg-white shadow-md h-screen">
        <FilterButtons />
        <CategoryList />
      </aside>
      <main class="w-3/4 p-6">
        <SearchBar />
        <TaskList />
      </main>
    </div>
  </div>
</template>

<script setup>
import FilterButtons from "@/components/FilterButtons.vue";
import SearchBar from "@/components/SearchBar.vue";
import CategoryList from "@/components/CategoryList.vue";
import TaskList from "@/components/TaskList.vue";
</script>
