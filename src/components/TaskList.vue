<template>
  <div class="tasks">
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in todoStore.filteredTasks" :key="task.id">
        <div v-if="editTaskId !== task.id">
          {{ task.text }} ({{ task.priority }})
          <button @click="startEditTask(task)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
        <div v-else>
          <input v-model="editTaskData.text" />
          <select v-model="editTaskData.categoryId">
            <option
              v-for="category in todoStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <select v-model="editTaskData.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button @click="saveTask(task.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </li>
    </ul>
    <input v-model="newTask.text" placeholder="Type here..." />
    <select v-model="newTask.categoryId">
      <option
        v-for="category in todoStore.categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <select v-model="newTask.priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button @click="addTask">Add Task</button>
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
</script>

<style scoped>
.tasks {
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