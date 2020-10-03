<template>
  <div class="app">
    <h2>🐝 Team Bee Admin</h2>

    <div class="button-row">
      <router-link
        to="/"
        class="text-button"
      >
        Index
      </router-link>
      <router-link
        to="/create"
        class="text-button"
      >
        Create
      </router-link>
    </div>

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
  padding: var(--gutter);
}

.button-row {
  display: flex;
  gap: var(--gutter);
}
</style>
