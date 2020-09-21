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
        Create
      </button>

      <button
        class="button-row-button button-vandana"
        @click="setUser('Vandana')"
      >
        Mom
      </button>
      <button
        class="button-row-button button-nitya"
        @click="setUser('Nitya')"
      >
        Nitya
      </button>
      <button
        class="button-row-button button-lokesh"
        @click="setUser('Lokesh')"
      >
        Lokesh
      </button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'LoginView',

  methods: {
    async getPuzzle() {
      try {
        const resp = await axios.get('/puzzles/2');
        console.log(resp);
      } catch (error) {
        console.log(error)
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
      // console.log(axios);

      
      // // const resp = await fetch('https://node-express-pg.herokuapp.com/v1/messages');
      // const data = await resp.json();
      // console.log(resp.data);
    },

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

/*.button-nitya {
  background: var(--color-nitya);
}

.button-lokesh {
  background: var(--color-lokesh);
}

.button-vandana {
  background: var(--color-vandana);
}*/
</style>
