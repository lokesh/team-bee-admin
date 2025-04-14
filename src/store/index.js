import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios';
import { addOneDay } from '@/utils';

Vue.use(Vuex)

/**
 * input: '{v,r,t}''
 * output: ['v','r','t']
 * @param  {String} str
 * @return {[String]}
 */
const parseCharArray = (str) => str.replace(/[{}]/g, "").split(',');

export default new Vuex.Store({
  state: {
    users: {},
    puzzles: {},
    dictionary: [],
  },

  mutations: {
    setUsers(state, val) {
      Vue.set(state, 'users', val);
    },

    setPuzzles(state, val) {
      Vue.set(state, 'puzzles', val);
    },

    addPuzzle(state, puzzle) {
      Vue.set(state.puzzles, puzzle.id, puzzle);
    },
  },

  getters: {
    // Sorted by latest
    puzzlesArray: (state) => {
      let arr = Object.values(state.puzzles);
      return arr.sort((a, b) => {
        let aTime = new Date(a.date).getTime();
        let bTime = new Date(b.date).getTime();
        return (aTime > bTime) ? -1 : 1;
      });
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
      return axios.get('/puzzles?order_by=date&dir=desc')
        .then(res => {
          const puzzles = {};

          res.data.forEach((puzzle) => {
            puzzle.outer_letters = parseCharArray(puzzle.outer_letters);
            puzzles[puzzle.id] = puzzle;
          })
          commit('setPuzzles', puzzles);
        });
    },

    deletePuzzle: ({ dispatch }, id) => {
      return axios.delete(`/puzzles/${id}`)
        .then(() => {
          return dispatch('loadPuzzles');
        });
    },

    savePuzzle: ({ commit, dispatch, getters }, puzzle) => {
      const { center_letter, outer_letters, answers } = puzzle;
      
      // Get all existing puzzle dates and normalize them to YYYY-MM-DD format
      const existingDates = new Set(getters.puzzlesArray.map(p => {
        const d = new Date(p.date);
        return d.toISOString().split('T')[0];
      }));
      console.log('Existing puzzle dates:', Array.from(existingDates));
      
      // Start with today
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      
      // Format date as YYYY-MM-DD
      const formatDate = (d) => d.toISOString().split('T')[0];
      
      console.log('Starting date check from:', formatDate(date));
      
      // Keep trying dates until we find one that doesn't exist
      let attempts = 0;
      while (existingDates.has(formatDate(date))) {
        console.log(`Attempt ${attempts + 1}: Date ${formatDate(date)} exists, trying next day`);
        date = addOneDay(date);
        attempts++;
        if (attempts > 30) {
          console.error('Too many attempts to find a free date');
          break;
        }
      }
      
      const pgDate = formatDate(date);
      console.log('Selected date:', pgDate);
      return axios.post('/puzzles', {
        date: pgDate,
        center_letter,
        outer_letters,
        answers,
      }).then((response) => {
        // Add the new puzzle to the store immediately
        commit('addPuzzle', {
          id: response.data.id,
          date: pgDate,
          center_letter,
          outer_letters,
          answers,
        });
        return dispatch('loadPuzzles');
      });
    },
  },
})
