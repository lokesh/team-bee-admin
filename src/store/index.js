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
  },
})
