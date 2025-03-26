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