<template>
  <div class="tasks">
    <ul>
      <li v-for="task in todoStore.filteredTasks" :key="task.id" class="task-item">
        <div v-if="editTaskId !== task.id" class="task-content">
          <span class="task-text">{{ task.text }}</span>
          <span class="task-category">{{ getCategoryName(task.categoryId) }}</span>
          <span :class="['task-priority', `priority-${task.priority}`]">
            {{ task.priority }}
          </span>
          <div class="task-actions">
            <button @click="startEditTask(task)" class="edit-btn">Edit</button>
            <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
          </div>
        </div>
        <div v-else class="edit-form">
          <input v-model="editTaskData.text" class="edit-input" />
          <select v-model="editTaskData.categoryId" class="edit-select">
            <option
              v-for="category in todoStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <select v-model="editTaskData.priority" class="edit-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div class="edit-actions">
            <button @click="saveTask(task.id)" class="save-btn">Save</button>
            <button @click="cancelEdit" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="add-task">
      <input v-model="newTask.text" placeholder="Type here..." class="add-input" />
      <select v-model="newTask.categoryId" class="add-select">
        <option
          v-for="category in todoStore.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <select v-model="newTask.priority" class="add-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button @click="addTask" class="add-btn">Add Task</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todoStore';

const todoStore = useTodoStore();
const newTask = ref({ text: '', categoryId: 1, priority: 'low' });
const editTaskId = ref(null);
const editTaskData = ref({ text: '', categoryId: 1, priority: 'low' });

const addTask = () => {
  if (newTask.value.text) {
    todoStore.addTask(newTask.value.text, newTask.value.categoryId, newTask.value.priority);
    newTask.value.text = '';
  }
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
  if (confirm('Are you sure you want to delete this task?')) {
    todoStore.deleteTask(id);
  }
};

const getCategoryName = (categoryId) => {
  const category = todoStore.categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Uncategorized';
};
</script>

<style scoped>
.tasks {
  margin-top: 20px;
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.task-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.task-text {
  flex-grow: 1;
}

.task-category {
  padding: 5px 10px;
  background-color: #e0e0e0;
  border-radius: 4px;
  font-size: 12px;
}

.task-priority {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
}

.priority-low {
  background-color: green;
}

.priority-medium {
  background-color: yellow;
  color: black;
}

.priority-high {
  background-color: red;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.edit-input, .edit-select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.edit-actions {
  display: flex;
  gap: 10px;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.add-input, .add-select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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