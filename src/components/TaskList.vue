<template>
  <div class="p-4">
    <ul class="space-y-2">
      <li
        v-for="task in todoStore.filteredTasks"
        :key="task.id"
        class="p-2 bg-gray-100 rounded shadow-sm flex justify-between items-center"
      >
        <!-- Toggle-Button für Completed-->
        <button
          @click="toggleTaskCompleted(task.id)"
          class="mr-2 p-1 rounded-full border w-6 h-6 flex items-center justify-center"
          :class="{
            'bg-green-500 text-white': task.completed,
            'bg-white text-gray-400': !task.completed,
          }"
        >
          ✓
        </button>

        <div v-if="editTaskId !== task.id" class="flex-1">
          <span class="text-gray-800">{{ task.text }}</span>
          <span class="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded">{{
            getCategoryName(task.categoryId)
          }}</span>
          <span
            :class="['ml-2 px-2 py-1 rounded', priorityClass(task.priority)]"
            >{{ task.priority }}</span
          >
        </div>
        <div
          v-else
          class="flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2"
        >
          <input
            v-model="editTaskData.text"
            class="border p-1 flex-1 rounded"
          />
          <select v-model="editTaskData.categoryId" class="border p-1 rounded">
            <option
              v-for="category in todoStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <select v-model="editTaskData.priority" class="border p-1 rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            @click="saveTask(task.id)"
            class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            @click="cancelEdit"
            class="mr-3 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
        <div class="flex space-x-2">
          <button
            @click="startEditTask(task)"
            class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            @click="deleteTask(task.id)"
            class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <div
      class="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
    >
      <input
        v-model="newTask.text"
        placeholder="Type here..."
        class="border p-2 flex-1 rounded"
      />
      <select v-model="newTask.categoryId" class="border p-2 rounded">
        <option
          v-for="category in todoStore.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <select v-model="newTask.priority" class="border p-2 rounded">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        @click="addTask"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 w-full sm:w-auto"
      >
        Add Task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();
const newTask = ref({ text: "", categoryId: null, priority: "low" });
const editTaskId = ref(null);
const editTaskData = ref({ text: "", categoryId: null, priority: "low" });

const addTask = () => {
  if (newTask.value.text) {
    todoStore.addTask(
      newTask.value.text,
      newTask.value.categoryId,
      newTask.value.priority
    );
    newTask.value = { text: "", categoryId: 1, priority: "low" };
  }
};

const toggleTaskCompleted = (taskId) => {
  todoStore.toggleTaskCompleted(taskId);
};

const startEditTask = (task) => {
  editTaskId.value = task.id;
  editTaskData.value = { ...task };
};

const saveTask = (id) => {
  todoStore.editTask(id, editTaskData.value);
  editTaskId.value = null;
};

const cancelEdit = () => {
  editTaskId.value = null;
};

const deleteTask = (id) => {
  if (confirm("Are you sure you want to delete this task?")) {
    todoStore.deleteTask(id);
  }
};

const getCategoryName = (categoryId) => {
  const category = todoStore.categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Uncategorized";
};

const priorityClass = (priority) => {
  return {
    low: "bg-green-200 text-green-700",
    medium: "bg-yellow-200 text-yellow-700",
    high: "bg-red-200 text-red-700",
  }[priority];
};
</script>
