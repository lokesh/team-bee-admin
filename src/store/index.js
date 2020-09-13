import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';
import { calcPoints } from '../utils';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input: '',
    answers: ["habitual","halibut","abut","alibi","alit","atilt","baba","baht","bail","bait","ball","bath","bathtub","bilabial","blab","blah","blat","bubba","habit","habitat","hail","halal","hall","halt","hath","hatha","haul","hiatal","hula","labia","labial","lath","luau","tabla","tail","tali","tall","taut","that","tibia","tibial","tuba"],
    foundWords: [],
    centerLetter: 'a',
    outerLetters: ["b","h","i","l","t","u"],
    user: null, // { id: 1, name: 'Rowan' }
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
    
    setUser(state, val) {
      state.user = val;
      if (localStorage) {
        localStorage.setItem('user', JSON.stringify(val));
      }
    },

    clearUser(state) {
      state.user = null;
      if (localStorage) {
        localStorage.removeItem('user');
      }
    },

    // Puzzle
    shuffleOuterLetters(state) {
        state.outerLetters = shuffle(state.outerLetters);
    },

    // Scoreboard
    addFoundWord(state, val) {
      state.foundWords.push(val);
      state.foundWords.sort();
    },
  },
  
  getters: {
    letters: (state) => [state.centerLetter, ...state.outerLetters],
    points: (state, getters) => calcPoints(state.foundWords, getters.letters),
    possiblePoints: (state, getters) => calcPoints(state.answers, getters.letters),
  },

})
