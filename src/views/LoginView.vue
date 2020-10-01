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

export default {
  name: 'LoginView',

  computed: {
    ...mapState([
      'users',
    ]),
  },

  methods: {
    async createPuzzle() {
      // const puzzle = {
      //   "
      //   "outerLetters":["v","i","r","u","a","l"],
      //   "answers":["altar","atrial","avatar","lariat","raita","ratatat","ritual","tall","taut","tiara","till","trail","trait","travail","trial","trill","trivia","trivial","ultra","vault","virtual","vital"]
      // };
      try {
        const resp = await axios.post('/puzzles', {
          name: "9968",
          centerLetter: "t",
          outerLetters:["v","i","r","u","a","l"],
          answers:["altar","atrial","avatar","lariat","raita","ratatat","ritual","tall","taut","tiara","till","trail","trait","travail","trial","trill","trivia","trivial","ultra","vault","virtual","vital"],
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
  gap: 8px;
}

@media (min-width: 640px) {
  .button-row {
    flex-direction: row;
    gap: var(--gutter);
  }

  .button-row-button {
    min-width: auto;
  }
}
</style>
