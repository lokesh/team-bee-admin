<template>
  <div class="app">
    <router-view v-if="isLoaded">
    </router-view>
    <page-spinner v-else />
  </div>
</template>

<script>
import PageSpinner from '@/components/PageSpinner';

export default {
  name: 'App',

  components: {
    PageSpinner,
  },

  data() {
    return {
      isLoaded: false,
    };
  },

  async beforeCreate() {
    await this.$store.dispatch('loadPuzzles');
    this.isLoaded = true;
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
