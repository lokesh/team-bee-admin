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

export default new Vuex.Store({
  state: {
    user: null, // id, name,
    users: null, // [id, name]

    puzzle: null, //id, name, date, config, userProgress
    puzzles: null, // [id, name, date]

    // Puzzle
    puzzleId: 1,
    puzzleName: 'September 13, 2020',
    centerLetter: 't',
    outerLetters: ["v","u","r","i","l","a"],
    answers: ["altar","atrial","avatar","lariat","raita","ratatat","ritual","tall","taut","tiara","till","trail","trait","travail","trial","trill","trivia","trivial","ultra","vault","virtual","vital"],

    // Progress
    foundWords: [],
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
    setPuzzle(state, val) {
      state.puzzle = val;
    },
    setPuzzles(state, val) {
      state.puzzles = val;
    },
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
    foundWords: (state) => {
      const found = userProgress(state, 'foundWords');
      return found ? found : [];
    },
    hint: (state) => userProgress(state, 'hint'),
    revealed: (state) => userProgress(state, 'revealed'),
    teamMode: (state) => userProgress(state, 'teamMode'),

    // UI
    letters: (state) => [state.centerLetter, ...state.outerLetters],
    points: (state, getters) => calcPoints(state.foundWords, getters.letters),
    pointsForGenius: (state, getters) => {
      return Math.ceil(getters.possiblePoints * 0.9);
    },
    possiblePoints: (state, getters) => calcPoints(state.answers, getters.letters),
  },

})
