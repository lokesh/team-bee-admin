import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios';

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
  },
})
