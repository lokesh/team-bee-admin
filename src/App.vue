<template>
  <div class="app">
    <router-view
      v-if="!loading"
    >

    </router-view>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'App',

  data() {
    return {
      loading: true,
    };
  },

  // TODO: move API calls to Vuex actions
  async beforeCreate() {
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
      const puzzle = puzzles.data[0];
      // const progress = await axios.get(`/puzzles/${puzzle.id}/users`);
      // console.log(progress.data);
      this.$store.dispatch('loadPuzzle', puzzle);
      // this.$store.dispatch('loadProgress', progress.data)

      this.loading = false;
    } catch (error) {
      console.log(error)
      this.loading = false;
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
