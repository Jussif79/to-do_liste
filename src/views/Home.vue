<template>
  <div class="home">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="title">Filter</h2>
      <FilterButtons />

      <h3 class="title categories-title">Categories</h3>
      <CategoryList />
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <SearchBar />
      <TaskList />
    </main>
  </div>
</template>

<script setup>
import FilterButtons from '@/components/FilterButtons.vue';
import SearchBar from '@/components/SearchBar.vue';
import CategoryList from '@/components/CategoryList.vue';
import TaskList from '@/components/TaskList.vue';
</script>

<style scoped>
/* General Layout */
.home {
  display: grid;
  grid-template-columns: minmax(250px, 300px) 1fr;
  height: 100vh;
  max-width: 1200px; /* Prevent the layout from stretching too wide */
  margin: 0 auto; /* Center the layout */
  background: #f4f4f4;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box; /* Ensure padding is included in the width */
}

/* Sidebar */
.sidebar {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6a4caf;
}

.categories-title {
  color: #009688;
}

/* Button Styles */
.sidebar button {
  background-color: #6a4caf;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.sidebar button:hover {
  background-color: #5a3c9f; /* Darker shade on hover */
}

/* Main Content */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    order: 2;
  }
}
</style>