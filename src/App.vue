<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'App',

  async created() {
    // Check if user set
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.commit('setUser', user);
      if (this.$route.name !== 'Game') {
        this.$router.push({ name: 'Game' });
      }
    }

    // Load user & puzzle data
    try {
      const users = await axios.get('/users');
      const puzzles = await axios.get('/puzzles');

      this.$store.commit('setUsers', users.data);
      this.$store.commit('setPuzzles', puzzles.data);

      // TODO: sort by date and pick most recent
      this.$store.commit('setPuzzle', puzzles.data[0]);

    } catch (error) {
      console.log(error)
    }

  }
}
</script>

<style>
@import "./styles/base.css";
</style>

<style scoped>
.app {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
