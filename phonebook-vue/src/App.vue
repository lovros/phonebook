<template>
  <div id="app">
    <TheNavbar/>
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script>

import TheNavbar from './components/TheNavbar.vue'

export default {
  name: 'App',
  components: {
    TheNavbar
  }
}
</script>

<style scoped>
</style>
