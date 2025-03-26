import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTodoStore = defineStore(
  "todo",
  () => {
    // State for categories
    const categories = ref([
      { id: 1, name: "Zuhause" },
      { id: 2, name: "Schule" },
      { id: 3, name: "Büro" },
    ]);

    // State for tasks
    const tasks = ref([
      {
        id: 1,
        text: "Task 1",
        categoryId: 1,
        priority: "low",
        completed: false,
      },
      {
        id: 2,
        text: "Task 2",
        categoryId: 3,
        priority: "high",
        completed: true,
      },
    ]);

    // State for filter
    const filter = ref("all");

    // State for search query
    const searchQuery = ref("");

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
        status: "todo",
      };
      tasks.value.push(newTask);
    };

    // Toggle task completion
    const toggleTaskCompleted = (id) => {
      const task = tasks.value.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
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
      let filtered = [...tasks.value];

      if (filter.value === "completed") {
        filtered = filtered.filter((task) => task.completed);
      } else if (filter.value === "todo") {
        filtered = filtered.filter((task) => !task.completed);
      }

      if (filter.value === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
      }

      if (searchQuery.value) {
        filtered = filtered.filter((task) =>
          task.text.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return filtered;
    });

    // Toggle task completion
    const toggleCompletion = (id) => {
      const task = tasks.value.find((task) => task.id === id);
      if (task)
        task.status = task.status === "completed" ? "todo" : "completed";
    };

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
      toggleCompletion,
      toggleTaskCompleted,
    };
  },
  {
    persist: true,
  }
);
