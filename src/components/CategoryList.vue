<template>
  <div class="p-4">
    <h2 class="mb-3 text-lg font-semibold text-purple-700">Categories</h2>

    <ul class="space-y-3">
      <li
        v-for="category in todoStore.categories"
        :key="category.id"
        class="bg-gray-100 rounded-lg"
      >
        <!-- View Mode -->
        <div v-if="editCategoryId !== category.id" class="p-3">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          >
            <span class="text-gray-700 font-medium break-all">{{
              category.name
            }}</span>
            <div class="flex space-x-2">
              <button
                @click="startEditCategory(category)"
                class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                @click="deleteCategory(category.id)"
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="p-3">
          <div class="flex flex-col sm:flex-row gap-2 w-full">
            <input
              v-model="editCategoryData.name"
              class="border p-2 rounded flex-1 min-w-0 focus:ring-2 focus:ring-blue-500"
              @keyup.enter="saveCategory(category.id)"
            />
            <div class="flex gap-2">
              <button
                @click="saveCategory(category.id)"
                class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 whitespace-nowrap"
              >
                Save
              </button>
              <button
                @click="cancelEdit"
                class="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- Add Category -->
    <div class="mt-4">
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          v-model="newCategory"
          placeholder="Add category..."
          class="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500"
          @keyup.enter="addCategory"
          @input="checkAddButton"
        />
        <button
          @click="addCategory"
          :disabled="!newCategory.trim()"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();
const newCategory = ref("");
const editCategoryId = ref(null);
const editCategoryData = ref({ name: "" });

const addCategory = () => {
  if (newCategory.value) {
    todoStore.addCategory(newCategory.value);
    newCategory.value = "";
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
  const hasTasks = todoStore.tasks.some((task) => task.categoryId === id);

  if (hasTasks) {
    alert("Cannot delete category: It contains tasks!");
    return;
  }

  if (confirm("Are you sure you want to delete this category?")) {
    todoStore.deleteCategory(id);
  }
};
</script>
