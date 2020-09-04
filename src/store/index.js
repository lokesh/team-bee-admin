import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input: '',
    answers: ['abdomen', 'abode', 'boom', 'baboon', 'bend'],
    foundWords: [],
    centerLetter: 'b',
    outerLetters: ['m', 'a', 'e', 'o', 'n', 'd'],
  },

  mutations: {
    // Input
    addInputLetter(state, val) {
        state.input = state.input + val;
    },
    clearInput(state) {
      state.input = '';
    },
    removeInputLetter(state) {
        state.input = state.input.slice(0, -1);
    },
    setInput(state, val) {
      state.input = val;
    },

    // Puzzle
    shuffleOuterLetters(state) {
        state.outerLetters = shuffle(state.outerLetters);
    },

    // Scoreboard
    addFoundWord(state, val) {
      state.foundWords.push(val);
    },
  },
  
  actions: {
  },
  
  modules: {
  }
})
