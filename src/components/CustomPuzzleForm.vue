<template>
    <div>
        <div class="form-row">
          <div>
            <label>Center letter</label>
            <input
              ref="center"
              v-model="centerLetter"
              maxlength="1"
              type="text"
              @keyup.enter="submit"
            />
          </div>

          <div>
            <label>Outer letters</label>
            <input
              v-model="outerLetters"
              type="text"
              maxlength="6"
              @keyup.enter="submit"
            />
          </div>

          <button
            @click="submit"
          >
            Generate
          </button>

          <button
            @click="save"
          >
            Save
          </button>
        </div>

        <dl>
          <dt>Points</dt>
          <dd>{{ points }}</dd>
        </dl>
        <dl>
            <dt>Panagrams</dt>
            <dd>{{ panagrams && panagrams.join(', ') }}</dd>
        </dl>
        <dl>
          <dt>{{ answers.length }} Words</dt>
          <dd> {{ answers.join(', ') }}</dd>
        </dl>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { calcPoints } from '@/utils';

export default {
  name: 'CustomPuzzleForm',

  data() {
    return {
      centerLetter: '',
      outerLetters: '',
      answers: [],
      panagrams: [],
      points: null,
    };
  },

  computed: {
    ...mapState([
      'dictionary',
    ]),
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.center.focus();
    });
  },

  methods: {
    submit() {
      let letters = [this.centerLetter, ...this.outerLetters.split('')];
      const letterSet = new Set(letters);
      letters = [...letterSet];
      if (letters.length !== 7) {
        console.log('Invalid letters');
        return;
      }

      this.answers = this.dictionary.filter(word => {
        // must container center letter
        let arr = word.split('');
        if (!arr.includes(this.centerLetter)) {
          return false
        }

        // All letters must be one of 7
        return arr.every(letter => {
          return letters.includes(letter);
        })
      });

      this.panagrams = this.answers.filter(word => {
          return new Set(word.split('')).size === 7;
        })

      this.points = calcPoints(this.answers);
    },

    save() {
      this.$store.dispatch('savePuzzle', {
        center_letter: this.centerLetter,
        outer_letters: this.outerLetters.split(''),
        answers: this.answers,
      });
    },

    resetForm() {

    },
  },
}
</script>
