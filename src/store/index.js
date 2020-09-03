import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input: '',
    foundWords: [],
    centerLetter: 'b',
    outerLetters: ['m', 'a', 'e', 'o', 'n', 'd'],
  },

  mutations: {
    addLetter(state, val) {
        state.input = state.input + val;
    },
    removeLetter(state) {
        state.input = state.input.slice(0, -1);
    },
    setInput(state, val) {
      state.input = val;
    },
    shuffle(state) {
        state.outerLetters = shuffle(state.outerLetters);
    },
  },
  
  actions: {
  },
  
  modules: {
  }
})
