<template>
  <div class="p-4">
    <!-- Task List -->
    <ul class="space-y-3">
      <li
        v-for="task in todoStore.filteredTasks"
        :key="task.id"
        class="p-3 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center"
      >
        <!-- Completion Toggle -->
        <button
          @click="toggleTaskCompleted(task.id)"
          class="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors"
          :class="
            task.completed
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-white border-gray-300'
          "
        >
          ✓
        </button>

        <!-- Task Content -->
        <div v-if="editTaskId !== task.id" class="flex-1 min-w-0">
          <span
            class="text-gray-800 block break-all"
            :class="{ 'line-through text-gray-500': task.completed }"
          >
            {{ task.text }}
          </span>
          <div class="flex flex-wrap gap-2 mt-1">
            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
              {{ getCategoryName(task.categoryId) }}
            </span>
            <span
              class="px-2 py-1 rounded text-sm"
              :class="priorityClass(task.priority)"
            >
              {{ task.priority }}
            </span>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="flex-1 w-full grid gap-3">
          <input
            v-model="editTaskData.text"
            class="border p-2 rounded w-full"
            placeholder="Task description"
          />
          <div class="grid grid-cols-2 gap-2">
            <select
              v-model="editTaskData.categoryId"
              class="border p-2 rounded"
            >
              <option
                v-for="category in todoStore.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <select v-model="editTaskData.priority" class="border p-2 rounded">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button
              @click="saveTask(task.id)"
              class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex-1"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex-1"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div v-if="editTaskId !== task.id" class="flex gap-2 shrink-0">
          <button
            @click="startEditTask(task)"
            class="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Edit
          </button>
          <button
            @click="deleteTask(task.id)"
            class="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Add Task Form -->
    <div class="mt-6 p-3 bg-gray-50 rounded-lg">
      <input
        v-model="newTask.text"
        placeholder="Add new task..."
        class="border p-2 rounded w-full mb-2"
      />
      <div class="grid grid-cols-2 gap-2 mb-3">
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
      </div>
      <button
        @click="addTask"
        :disabled="!newTask.text"
        class="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
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
const newTask = ref({ text: "", categoryId: 1, priority: "low" });
const editTaskId = ref(null);
const editTaskData = ref({ text: "", categoryId: 1, priority: "low" });

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
