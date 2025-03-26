<template>
  <div class="container">
    <router-view
      :todos="todos"
      :categories="categories"
      @add-category="addCategory"
      @save-category="saveCategory"
      @remove-category="removeCategory"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Schule',
        },
        {
          id: 2,
          name: 'Privat',
        },
      ],
      todos: [
        {
          id: 1,
          state: 'done',
          title: 'Hausaufgaben erledigen',
          category_id: 1,
        },
      ],
    }
  },

  methods: {
    /**
     * Add category into data
     */
    addCategory(new_category) {
      let new_id

      if (this.categories.length) {
        new_id = this.categories.slice(-1)[0].id + 1
      } else {
        new_id = 1
      }

      this.categories.push({
        id: new_id,
        name: new_category,
      })
    },

    /**
     * Save category
     */
    saveCategory(data) {
      // Edit specific category with given id
      this.categories = this.categories.filter((category) => {
        if (category.id == data.id) {
          category.name = data.new_name
        }
        return category
      })
    },

    /**
     * Remove category from data
     */
    removeCategory(id) {
      // Remove category fromo array with given id
      this.categories = this.categories.filter((category) => {
        return category.id != id
      })
    },
  },
}
</script>

<style scoped>
</style>
