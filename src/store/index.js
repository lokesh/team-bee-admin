import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios';
import shuffle from 'lodash.shuffle';
import { calcPoints } from '@/utils';

Vue.use(Vuex)

// Convenience function for mutations to reduce boilerplate
const set = key => (state, val) => {
  state[key] = val;
};

/**
 * input: '{v,r,t}''
 * output: ['v','r','t']
 * @param  {String} str
 * @return {[String]}
 */
const parseCharArray = (str) => str.replace(/[{}]/g, "").split(',');

/**
 * input ['kiwi', 'melon']
 * output "{kiwi,melon}"
 * @param  {[String]} arr
 * @return {String}
 */
const prepStrArray = (arr) => `{${arr.join()}}`;

export default new Vuex.Store({
  state: {
    users: {},
    puzzles: {},
    puzzleProgress: {},
    userId: 0,
    puzzleId: 0,

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

    // Users
    setUsers(state, val) {
      Vue.set(state, 'users', val);
    },
    setUserId(state, val) {
      state.userId = val;
      localStorage.setItem('userId', val);
    },
    clearUser(state) {
      state.user = {};
      localStorage.removeItem('user');
    },

    // Puzzles
    setPuzzles(state, val) {
      Vue.set(state, 'puzzles', val);
    },
    setPuzzleId: set('puzzleId'),

    shuffleOuterLetters(state) {
      state.puzzles[state.puzzleId].outer_letters =  shuffle(state.puzzles[state.puzzleId].outer_letters);
    },

    // Progress
    setPuzzleProgress(state, val) {
      Vue.set(state, 'puzzleProgress', val);
    },

    addFoundWord(state, data) {
      const { userId, word } = data;
      state.puzzleProgress[userId].found_words.push(word);
    },
  },

  getters: {
    user: (state) => {
      return state.users[state.userId] || {};
    },

    puzzle: (state) => {
      return state.puzzles[state.puzzleId] || {};
    },

    teamMode: (state) => state.puzzleProgress[state.userId].team_mode,
    hint: (state) => state.puzzleProgress[state.userId].hint,
    revealed: (state) => state.puzzleProgress[state.userId].revealed,
    foundWords: (state) => state.puzzleProgress[state.userId].found_words,

    // UI
    letters: (state, getters) => {
      if (!getters.puzzle) return [];
      return [getters.puzzle.center_letter, ...getters.puzzle.outer_letters];
    },
    points: (state, getters) => calcPoints(getters.foundWords, getters.letters),
    pointsForGenius: (state, getters) => {
      return Math.ceil(getters.possiblePoints * 0.9);
    },
    possiblePoints: (state, getters) => {
      if (!getters.puzzle) return 0;
      return calcPoints(getters.puzzle.answers, getters.letters)
    },
  },

  actions: {
    /**
     * Loads all user data. Used to bootstrap app.
     * @return {Promise}]
     */
    loadUsers: ({ commit }) => {
      return axios.get('/users')
        .then(res => {
          const users = {};
          res.data.forEach(user => {
            users[user.id] = user;
          })
          commit('setUsers', users);
        });
    },

    /**
     * Loads all puzzle data. Used to bootstrap app.
     * @return {Promise}]
     */
    loadPuzzles: ({ commit }) => {
      return axios.get('/puzzles')
        .then(res => {
          const puzzles = {};

          res.data.forEach((puzzle) => {
            puzzle.outer_letters = parseCharArray(puzzle.outer_letters);
            puzzles[puzzle.id] = puzzle;
          })
          commit('setPuzzles', puzzles);
        });
    },

    /**
     * TODO: load puzzleProgress data
     * @type {Promise}
     */
    switchPuzzle: ({ state, commit}, data) => {
      commit('setPuzzleId', data);

      // Load progress data for puzzle
      return axios.get(`/puzzles/${state.puzzleId}/users`)
        .then(res => {
          // const userIds = Object.keys(state.users);
          const progressCollection = {};

          // Store existing progress by user id in object
          res.data.forEach(progress => {
            progressCollection[progress.user_id] = progress;
          })
          commit('setPuzzleProgress', progressCollection);
        })
    },

    createUserPuzzleProgress: (data) => {
      const { userId, puzzleId } = data;
      return axios.post(`/puzzles/${puzzleId}/users/${userId}`);
    },

    loadProgress: ({ commit }, data) => {
      let progress = {};
      data.forEach(item => {
        progress[item.userid] = item.progress;
      })
      commit('setProgress', progress);
    },

    saveFoundWord: ({ state, commit, getters }, word) => {
      commit('addFoundWord', {
        userId: state.userId,
        word,
      })

      axios.put(`/puzzles/${state.puzzleId}/users/${state.userId}`, {
        found_words: prepStrArray(getters.foundWords),
      });
    },
  },
})
