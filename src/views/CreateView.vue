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

    <div class="row">
      <div>
        <label>Center letter</label>
        <input
          ref="center"
          v-model="centerInput"
          maxlength="1"
          type="text"
          @keyup.enter="submit"
        />
      </div>

      <div>
        <label>Outer letters</label>
        <input
          v-model="outerInput"
          type="text"
          maxlength="6"
          @keyup.enter="submit"
        />
      </div>
    </div>

    <h3>Points</h3>
    {{ points }}
    <br /><br />

    <h3>Words </h3>
    {{ answers.join(', ') }}

    <hr />
    <br />

    <div class="row">
      <button
          class="button-row-button"
          @click="randomize"
        >
          Generate random puzzles
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Center</th>
          <th style="width: 8em">Outer</th>
          <th>Points</th>
          <th>Panagrams</th>
          <th>Answers</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(result, i) in results"
          :key="`result-${i}`"
        >
          <td>{{ result.center }}</td>
          <td>{{ result.outer.join(', ') }}</td>
          <td>{{ result.points }}</td>
          <td>{{ result.panagrams }}</td>
          <td>
            {{ result.answers.length }}<br />
            {{ result.answers.join(', ') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import shuffle from 'lodash.shuffle';
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
      centerInput: '',
      outerInput: '',
      calcPoints,
      points: '',
      answers: [],
      dictionary: [],
      results: [],
    }
  },

  async created() {
    let resp = await fetch('/data/dictionary.json');
    this.dictionary = await resp.json();
  },

  mounted() {
    this.$refs.center.focus();

    // this.randomize();
  },

  methods: {
    submit() {
      let letters = [this.centerInput, ...this.outerInput.split('')];
      const letterSet = new Set(letters);
      letters = [...letterSet];
      if (letters.length !== 7) {
        console.log('Invalid letters');
        return;
      }

      this.answers = this.dictionary.filter(word => {
        // must container center letter
        let arr = word.split('');
        if (!arr.includes(this.centerInput)) {
          return false
        }

        // All letters must be one of 7
        return arr.every(letter => {
          return letters.includes(letter);
        })
      });

      this.points = calcPoints(this.answers);
    },

    randomize() {
      let count = 0;
      let loopCounter = 0;
      while(count < 10) {
        // Pick 7 random letters, first letter is center.
        let alpha = [...'abcdefghijklmnopqrstuvwxyz']
        alpha = shuffle(alpha);

        let center = alpha[0];
        let outer = alpha.slice(1, 7);
        let letters = [center, ...outer];

        let answers = this.dictionary.filter(word => {
          // must container center letter
          let arr = word.split('');
          if (!arr.includes(center)) {
            return false
          }

          // All letters must be one of 7
          return arr.every(letter => {
            return letters.includes(letter);
          })
        });

        let points = calcPoints(answers);

        let panagrams = answers.filter(word => {
          return new Set(word.split('')).size === 7;
        })

        if (panagrams.length > 0 && points > 150 && points < 400) {
          this.results.push({
            center,
            outer,
            answers,
            points,
            panagrams,
          });

          count += 1;
        }
        loopCounter += 1;
        console.log(loopCounter);
      }
    },
  },
}
</script>

<style scoped>
.row {
  display: flex;
  gap: var(--gutter);
  align-items: flex-end;
  margin-bottom: var(--gutter);
}
</style>
