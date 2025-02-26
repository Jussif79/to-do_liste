<template>
  <div class="categories">
    <ul>
      <li v-for="category in todoStore.categories" :key="category.id" class="category-item">
        <div v-if="editCategoryId !== category.id" class="category-content">
          <span>{{ category.name }}</span>
          <div class="category-actions">
            <button @click="startEditCategory(category)" class="edit-btn">Edit</button>
            <button @click="deleteCategory(category.id)" class="delete-btn">Delete</button>
          </div>
        </div>
        <div v-else class="edit-form">
          <input v-model="editCategoryData.name" class="edit-input" />
          <div class="edit-actions">
            <button @click="saveCategory(category.id)" class="save-btn">Save</button>
            <button @click="cancelEdit" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="add-category">
      <input v-model="newCategory" placeholder="Add Category..." class="add-input" />
      <button @click="addCategory" class="add-btn">Add</button>
    </div>
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
  font-family: Arial, sans-serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

.category-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.category-actions {
  display: flex;
  gap: 10px;
}

.edit-form {
  display: flex;
  gap: 10px;
  width: 100%;
}

.edit-input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.edit-actions {
  display: flex;
  gap: 10px;
}

.add-category {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.add-input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.add-btn {
  background-color: #007bff;
  color: white;
}
</style>