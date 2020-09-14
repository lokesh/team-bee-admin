import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';
import { calcPoints } from '../utils';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Puzzle
    puzzleId: 1,
    puzzleName: 'September 13, 2020',
    centerLetter: 't',
    outerLetters: ["v","u","r","i","l","a"],
    answers: ["altar","atrial","avatar","lariat","raita","ratatat","ritual","tall","taut","tiara","till","trail","trait","travail","trial","trill","trivia","trivial","ultra","vault","virtual","vital"],

    // User
    user: null, // { id: 1, name: 'Rowan' }

    // Progress
    foundWords: ["altar","lariat","raita","ratatat","ritual","tall","taut","tiara","till","trail","trait","travail","trial","trill","trivia","trivial","ultra","vault","virtual","vital"],    

    // UI
    input: '',
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
    
    // User
    setUser(state, val) {
      state.user = val;
      localStorage.setItem('user', JSON.stringify(val));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
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
    pointsForGenius: (state, getters) => {
      return Math.ceil(getters.possiblePoints * 0.9);
    },
    possiblePoints: (state, getters) => calcPoints(state.answers, getters.letters),
  },

})
