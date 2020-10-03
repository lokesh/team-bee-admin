<template>
  <div class="page">
    <div class="button-row">
      <button
        v-if="false"
        class="button-row-button"
        @click="createPuzzle"
      >
        Create Puzzle
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Center</th>
          <th>Outer</th>
          <th>Points</th>
          <th class="wide-col">Answers</th>
          <th class="wide-col">10k</th>
          <th class="wide-col">61k</th>
          <th class="wide-col">194k</th>
          <th class="wide-col">466k</th>
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
          <td>{{ calcPoints(puzzle.answers) }}</td>
          <td>
            {{ puzzle.answers.length }}<br />
            {{ puzzle.answers.join(', ') }}
          </td>
            <td>
            <div v-html="missing(puzzle, d10)" />
            <div v-html="answers(puzzle, d10)" />
          </td>
          <td>
            <div v-html="missing(puzzle, d61)" />
            <div v-html="answers(puzzle, d61)" />
          </td>
          <td>
            <div v-html="missing(puzzle, d194)" />
            <div v-html="answers(puzzle, d194)" />
          </td>
          <td>
            <div v-html="missing(puzzle, d466)" />
            <div v-html="answers(puzzle, d466)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import axios from '@/axios';
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
      dictionary: null,
      d10: [],
      d61: [],
      d194: [],
      d466: [],

    }
  },

  async created() {
    let resp = await fetch('/data/usa-61k.json');
    let data = await resp.json();
    this.d61 = Object.keys(data);

    resp = await fetch('/data/eng-466k.json');
    data = await resp.json();
    this.d466 = Object.keys(data);

    resp = await fetch('/data/eng-194k.txt');
    data = await resp.text();
    this.d194 = data.split('\n');

    resp = await fetch('/data/usa-10k.txt');
    data = await resp.text();
    this.d10 = data.split('\n');

  },

  methods: {
    // async loadJSON(file) {
    //   return Object.keys(data);
    // },

    async loadText(file) {
      const resp = await fetch(file);
      const data = await resp.text();
      const arr = data.split('\n');
      const dict = {};
      arr.forEach(word => {
        dict[word] = 1;
      })
      return dict;
    },

    // async createPuzzle() {
    //   // console.log(p);
    //   try {
    //     const resp = await axios.post('/puzzles', {
    //       name: p.puzzleID,
    //       centerLetter: "o",
    //       outerLetters:["c","n","e","x","i","t"],
    //       answers: p.answers,
    //     });
    //     console.log(resp);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    missing(puzzle, dict) {
      const missing = puzzle.answers.filter(word => {
        return !dict.includes(word);
      });

      return `<b>Missing ${missing.length} words</b><br /> ${missing.join(', ')}<br /><br />`;
    },

    answers(puzzle, dict) {
      let letters = [puzzle.center_letter, ...puzzle.outer_letters];
      const answers = dict.filter(word => {
        // min 4 letters
        if (word.length < 4) {
          return false;
        }

        // must container center letter
        let arr = word.split('');
        if (!arr.includes(puzzle.center_letter)) {
          return false
        }

        // All letters must be one of 7
        return arr.every(letter => {
          return letters.includes(letter);
        })
      });
      return `<b>Answers ${answers.length} words and ${calcPoints(answers)}pts</b><br />${answers.join(', ')}<br /><br />`;
    },

    dictLookup(puzzle) {
      console.log('puzzle', [puzzle.center_letter, ...puzzle.outer_letters]);
      puzzle.answers.forEach(word => {
        if (!this.dictionary[word]) {
          console.log('missing word:', word)
        }
      })
    },
  },
}
</script>

<style scoped>
.wide-col {
  min-width: 25em;
}
</style>
