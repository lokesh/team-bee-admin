<template>
  <div class="login">
    <h2>Who's playing?</h2>

    <div class="button-row">
      <button
        @click="getPuzzle"
      >
        Get
      </button>

      <button
        @click="createPuzzle"
      >
        Create Puzzle
      </button>

      <button
        @click="createProgress"
      >
        Create Progress
      </button>

      <button
        v-for="user in users"
        :key="user.id"
        class="button-row-button button-vandana"
        @click="setUser(user.id)"
      >
        {{ user.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from '@/axios';

export default {
  name: 'LoginView',

  computed: {
    ...mapState([
      'users',
    ]),
  },

  methods: {
    async getPuzzle() {
      try {
        const resp = await axios.get('/puzzles/2');
        console.log(resp);
      } catch (error) {
        console.log(error)
      }
    },

    async createProgress() {
      // 2 2
      const progress = {
        "revealed": true,
        "teamMode": true,
        "foundWords":["altar","atrial","avatar"],
      };
      try {
        const resp = await axios.post('/puzzles/2/users/2', {
          progress: JSON.stringify(progress),
        });
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },
    async createPuzzle() {
      const puzzle = {
        "centerLetter":"t",
        "outerLetters":["v","i","r","u","a","l"],
        "answers":["altar","atrial","avatar","lariat","raita","ratatat","ritual","tall","taut","tiara","till","trail","trait","travail","trial","trill","trivia","trivial","ultra","vault","virtual","vital"]
      };
      try {
        const resp = await axios.post('/puzzles', {
          name: "9968",
          config: JSON.stringify(puzzle),
        });
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    },

    setUser(id) {
      const user = this.users.find(user => user.id === id);
      this.$store.commit('setUser', user);
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
