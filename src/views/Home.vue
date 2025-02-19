<template>
  <div class="home">

    <p>Willkommen bei einer weiteren Vue.js Test-Webapplikation.</p>

    <p>Im Moment kannst du hier nur <router-link :to="'/manage-category'">Kategorien</router-link> verwalten.</p>
    
    <p>Alles weitere folgt... 😊</p>

  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
