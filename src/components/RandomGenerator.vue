<template>
  <div>
      <div class="row">
        <button
            class="button-row-button"
            @click="randomize"
          >
            Generate random puzzles
        </button>

        <div>
          Iterations: {{ iterations }}
        </div>
      </div>

      <div class="form-row">
        <div>
          <label>Minimum panagrams:</label>
          <input type="number" v-model="minPanagrams" />
        </div>
        <div>
          <label>Min points:</label>
          <input type="number" v-model="minPoints" />
        </div>
        <div>
          <label>Max points:</label>
          <input type="number" v-model="maxPoints" />
        </div>
        <div>
          <label>Puzzles to generate:</label>
          <input type="number" v-model="puzzleCount" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Center</th>
            <th style="width: 8em">Outer</th>
            <th>Points</th>
            <th>Panagrams</th>
            <th>Answers</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(result, i) in results"
            :key="`result-${i}`"
          >
            <td>{{ result.center_letter }}</td>
            <td>{{ result.outer_letters.join(', ') }}</td>
            <td>{{ result.points }}</td>
            <td>{{ result.panagrams }}</td>
            <td>
              {{ result.answers.length }}<br />
              {{ result.answers.join(', ') }}
            </td>
            <td>
              <button
                @click="savePuzzle(result)"
              >
                Save
              </button>
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
  name: 'CreateView',

  computed: {
    ...mapState([
      'puzzles',
      'dictionary',
    ]),
  },

  data() {
    return {
      iterations: 0,
      minPanagrams: 1,
      minPoints: 100,
      maxPoints: 400,
      puzzleCount: 1,
      results: [],
    }
  },

  // async created() {
  //   let resp = await fetch('/data/dictionary.json');
  //   this.dictionary = await resp.json();
  // },

  methods: {
    randomize() {
      let count = 0;
      while(count < this.puzzleCount) {
        // Pick 7 random letters, first letter is center.
        let alpha = [...'abcdefghijklmnopqrtuvwxyz']
        alpha = shuffle(alpha);

        let center_letter = alpha[0];
        let outer_letters = alpha.slice(1, 7);
        let letters = [center_letter, ...outer_letters];

        let answers = this.dictionary.filter(word => {
          // must container center letter
          let arr = word.split('');
          if (!arr.includes(center_letter)) {
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

        if (panagrams.length > this.minPanagrams
          && points > this.minPoints
          && points < this.maxPoints
        ) {
          console.log(center_letter, outer_letters, answers, points, panagrams);
          this.results.push({
            center_letter,
            outer_letters,
            answers,
            points,
            panagrams,
          });

          count += 1;
        }
        this.iterations += 1;
        console.log(this.iterations);
      }
    },

    savePuzzle(puzzle) {
      this.$store.dispatch('savePuzzle', puzzle);
    },
  },
}
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
}
</style>
