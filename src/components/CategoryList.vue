<template>
  <div class="p-4">
    <h2 class="mt-4 mb-4 text-xl font-semibold text-purple-700">Category</h2>
    <ul class="space-y-2">
      <li 
        v-for="category in todoStore.categories" 
        :key="category.id" 
        class="flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm"
      >
        <div v-if="editCategoryId !== category.id" class="flex justify-between w-full">
          <span class="text-gray-700 font-medium">{{ category.name }}</span>
          <div class="space-x-2">
            <button @click="startEditCategory(category)" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">Edit</button>
            <button @click="deleteCategory(category.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
          </div>
        </div>
        <div v-else class="flex w-full space-x-2">
          <input v-model="editCategoryData.name" class="border p-1 flex-1 rounded" />
          <button @click="saveCategory(category.id)" class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700">Save</button>
          <button @click="cancelEdit" class="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
        </div>
      </li>
    </ul>

    <div class="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <input v-model="newCategory" placeholder="Add Category..." class="w-10 border p-2 flex-1 rounded" />
      <button @click="addCategory" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 w-full sm:w-auto">Add</button>
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
  // Prüfe, ob Tasks in dieser Kategorie existieren
  const hasTasks = todoStore.tasks.some(task => task.categoryId === id);

  if (hasTasks) {
    alert("Kategorie kann nicht gelöscht werden, da sie Tasks enthält!");
    return;
  }

  if (confirm('Are you sure you want to delete this category?')) {
    todoStore.deleteCategory(id);
  }
};
</script>
