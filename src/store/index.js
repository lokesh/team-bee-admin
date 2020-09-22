import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';
import { calcPoints } from '@/utils';

Vue.use(Vuex)


function userProgress(state, val) {
  if (state.users && state.puzzle && state.puzzle.userProgress) {
      return state.puzzle.userProgress[state.user.id][val];
  }
  return false;
}

// Convenience function for mutations to reduce boilerplate
const set = key => (state, val) => {
  state[key] = val;
};

export default new Vuex.Store({
  state: {
    users: null, // [id, name]
    puzzles: null, // [id, name, date]

    // User
    user: null, // id, name,

    // Puzzle
    puzzleId: 1,
    puzzleName: 'September 13, 2020',
    centerLetter: '',
    outerLetters: [],
    answers: [],

    // Progress
    progress: {},
    // foundWords: [],
    // foundWords: ["altar","lariat","raita","ratatat","ritual","tall","taut","tiara","till","trail","trait","travail","trial","trill","trivia","trivial","ultra","vault","virtual","vital"],

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
    setUsers(state, val) {
      state.users = val;
    },

    // Puzzles
    setPuzzleId: set('puzzleId'),
    setPuzzleName: set('puzzleName'),
    setCenterLetter: set('centerLetter'),
    setOuterLetters: set('outerLetters'),
    setAnswers: set('answers'),

    setPuzzles(state, val) {
      state.puzzles = val;
    },

    // Progress
    setProgress(state, val) {
      console.log('set progress');
      console.log('new', Object.assign({}, val));
      state.progress = Object.assign({}, val);
    },

    shuffleOuterLetters(state) {
        state.outerLetters = shuffle(state.outerLetters);
    },



    // Scoreboard
    addFoundWord() {
      // state.foundWords.push(val);
      // state.foundWords.sort();
    },
  },

  getters: {
    foundWords: (state) => {
      if (state.progress && state.progress[state.user.id] && state.progress[state.user.id].foundWords) {
        return state.progress[state.user.id].foundWords;
      } else {
        return [];
      }
      // return state.progress[state.user.id].foundWords || [];
      // const found = userProgress(state, 'foundWords');
      // return found ? found : [];
    },
    hint: (state) => userProgress(state, 'hint'),
    revealed: (state) => userProgress(state, 'revealed'),
    teamMode: (state) => userProgress(state, 'teamMode'),

    // UI
    letters: (state) => [state.centerLetter, ...state.outerLetters],
    points: (state, getters) => calcPoints(getters.foundWords, getters.letters),
    pointsForGenius: (state, getters) => {
      return Math.ceil(getters.possiblePoints * 0.9);
    },
    possiblePoints: (state, getters) => calcPoints(state.answers, getters.letters),
  },

  actions: {
    addFoundWord: ({ state }, word) => {
      // Hit API
      console.log(word);
      state.progress[state.user.id].foundWords.push(word);
    },

    loadProgress: ({ commit }, data) => {
      let progress = {};
      data.forEach(item => {
        progress[item.userid] = item.progress;
      })
      commit('setProgress', progress);
    },

    loadPuzzle: ({ commit }, puzzle) => {
      commit('setPuzzleId', puzzle.id);
      commit('setPuzzleName', puzzle.name);
      commit('setCenterLetter', puzzle.config.centerLetter);
      commit('setOuterLetters', puzzle.config.outerLetters);
      commit('setAnswers', puzzle.config.answers);
    },
  },
})
