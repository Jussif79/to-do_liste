<template>
  <div class="categories">
    <h2>Categories</h2>
    <ul>
      <li v-for="category in todoStore.categories" :key="category.id">
        <div v-if="editCategoryId !== category.id">
          {{ category.name }}
          <button @click="startEditCategory(category)">Edit</button>
          <button @click="deleteCategory(category.id)">Delete</button>
        </div>
        <div v-else>
          <input v-model="editCategoryData.name" />
          <button @click="saveCategory(category.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
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
const editCategoryId = ref(null);
const editCategoryData = ref({ name: '' });

const addCategory = () => {
  if (newCategory.value) {
    todoStore.addCategory(newCategory.value);
    newCategory.value = '';
  }
};

const startEditCategory = (category) => {
  editCategoryId.value = category.id;
  editCategoryData.value = { ...category };
};

const saveCategory = (id) => {
  todoStore.editCategory(id, editCategoryData.value.name);
  editCategoryId.value = null;
};

const cancelEdit = () => {
  editCategoryId.value = null;
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