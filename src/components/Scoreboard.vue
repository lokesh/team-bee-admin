<template>
  <div class="scoreboard">
    <h3>Scoreboard</h3>
    <div
      v-for="(word, i) in foundWords"
      :key="i"
    >
      {{ word }}
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Scoreboard',

  computed: {
    ...mapState([
      'foundWords',
    ]),
  },
}
</script>

<style scoped>
</style>
