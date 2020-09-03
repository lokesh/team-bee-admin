<template>
  <div id="app">
    <hive />
    <word-list />
  </div>
</template>

<script>
import Hive from './components/Hive.vue';
import WordList from './components/WordList.vue'

export default {
  name: 'App',
  components: {
    Hive,
    WordList,
  },
}
</script>

<style>
@import "./styles/base.css";
</style>

