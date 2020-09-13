<template>
  <div class="login">
    <h2>Who's playing?</h2>

    <div class="button-row">
      <button
        class="button-row-button"
        @click="setUser('Mom')"
      >
        Mom
      </button>
      <button
        class="button-row-button"
        @click="setUser('Nitya')"
      >
        Nitya
      </button>
      <button
        class="button-row-button"
        @click="setUser('Lokesh')"
      >
        Lokesh
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',

  methods: {
    setUser(user) {
      this.$store.commit('setUser', {
        name: user,
        id: 2,
      });
      this.$router.push('game')
    },
  },
}
</script>

<style scoped>
.login {
  text-align: center;
}
</style>
