<template>
  <div class="page">
    <h2>🐝 Team Bee Admin</h2>

    <div class="button-row">
      <button
        class="button-row-button"
        @click="createPuzzle"
      >
        Create Puzzle
      </button>

      <button
        class="button-row-button"
      >
        Test
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Center</th>
          <th>Outer</th>
          <th>Words</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="puzzle in puzzles"
          :key="puzzle.id"
        >
          <td>{{ puzzle.id }}</td>
          <td>{{ puzzle.center_letter }}</td>
          <td>{{ puzzle.outer_letters.join(', ') }}</td>
          <td>{{ puzzle.answers.length }}</td>
          <td>{{ calcPoints(puzzle.answers) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from '@/axios';
import p from '@/data/10159.json';
import { calcPoints } from '@/utils';

export default {
  name: 'LoginView',

  computed: {
    ...mapState([
      'puzzles'
    ]),
  },

  data() {
    return {
      calcPoints,
    }
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
  },
}
</script>

<style scoped>
.page {
  padding: var(--gutter);
}
</style>
