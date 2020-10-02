<template>
  <div class="page">
    <h2>Who's playing?</h2>

    <div class="button-row">
      <button
        v-if="false"
        @click="createPuzzle"
      >
        Create Puzzle
      </button>

      <button
        v-for="user in users"
        :key="user.id"
        class="button-row-button"
        @click="login(user.id)"
      >
        {{ user.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from '@/axios';
import p from '@/data/10159.json';

export default {
  name: 'LoginView',

  computed: {
    ...mapState([
      'users',
    ]),
  },

  methods: {
    async createPuzzle() {
      // console.log(p);
      try {
        const resp = await axios.post('/puzzles', {
          name: p.puzzleID,
          centerLetter: "o",
          outerLetters:["c","n","e","x","i","t"],
          answers: p.answers,
        });
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },

    login(id) {
      // const user = this.users.find(user => user.id === id);
      this.$store.commit('setUserId', id);
      this.$router.push('game')
    },
  },
}
</script>

<style scoped>
.page {
  padding: var(--gutter);
  text-align: center;
}

.button-row-button {
  margin-bottom: var(--gutter);
  min-width: 50vw;
}

.button-row {
  flex-direction: column;
  align-items: center;
}

@media (min-width: 640px) {
  .button-row {
    flex-direction: row;
  }

  .button-row-button {
    min-width: auto;
  }
}
</style>
