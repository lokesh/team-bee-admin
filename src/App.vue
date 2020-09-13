<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.commit('setUser', user);
      this.$router.push({ name: 'Game' });
    }
  }
}
</script>

<style>
@import "./styles/base.css";
</style>
