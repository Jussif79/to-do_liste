<template>
    <div class="categories">
      <h2>Categories</h2>
      <ul>
        <li v-for="category in todoStore.categories" :key="category.id">
          {{ category.name }}
          <button @click="editCategory(category.id)">Edit</button>
          <button @click="deleteCategory(category.id)">Delete</button>
        </li>
      </ul>
      <input v-model="newCategory" placeholder="Add Category..." />
      <button @click="addCategory">Add</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTodoStore } from '@/stores/todoStore';
  
  const todoStore = useTodoStore();
  const newCategory = ref('');
  
  const addCategory = () => {
    if (newCategory.value) {
      todoStore.addCategory(newCategory.value);
      newCategory.value = '';
    }
  };
  
  const editCategory = (id) => {
    const newName = prompt('Enter new category name:');
    if (newName) {
      todoStore.editCategory(id, newName);
    }
  };
  
  const deleteCategory = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      todoStore.deleteCategory(id);
    }
  };
  </script>
  
  <style scoped>
  .categories {
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>