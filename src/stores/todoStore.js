import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  // State for categories
  const categories = ref([
    { id: 1, name: 'Zuhause' },
    { id: 2, name: 'Schule' },
    { id: 3, name: 'Büro' },
  ]);

  // State for tasks
  const tasks = ref([
    { id: 1, text: 'Task 1', categoryId: 1, priority: 'low', status: 'todo' },
    { id: 2, text: 'Task 2', categoryId: 3, priority: 'high', status: 'completed' },
  ]);

  // State for filter
  const filter = ref('all');

  // State for search query
  const searchQuery = ref('');

  // Add a new category
  const addCategory = (name) => {
    const newCategory = {
      id: categories.value.length + 1,
      name,
    };
    categories.value.push(newCategory);
  };

  // Edit a category
  const editCategory = (id, newName) => {
    const category = categories.value.find((cat) => cat.id === id);
    if (category) {
      category.name = newName;
    }
  };

  // Delete a category
  const deleteCategory = (id) => {
    categories.value = categories.value.filter((cat) => cat.id !== id);
  };

  // Add a new task
  const addTask = (text, categoryId, priority) => {
    const newTask = {
      id: tasks.value.length + 1,
      text,
      categoryId,
      priority,
      status: 'todo',
    };
    tasks.value.push(newTask);
  };

  // Edit a task
  const editTask = (id, updatedTask) => {
    const taskIndex = tasks.value.findIndex((t) => t.id === id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updatedTask };
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  };

  // Filter tasks by status
  const filteredTasks = computed(() => {
    let filtered = tasks.value;
    if (filter.value !== 'all') {
      filtered = filtered.filter((task) => task.status === filter.value);
    }
    if (searchQuery.value) {
      filtered = filtered.filter((task) =>
        task.text.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return filtered;
  });

  // Set filter
  const setFilter = (newFilter) => {
    filter.value = newFilter;
  };

  return {
    categories,
    tasks,
    filter,
    searchQuery,
    addCategory,
    editCategory,
    deleteCategory,
    addTask,
    editTask,
    deleteTask,
    filteredTasks,
    setFilter,
  };
});