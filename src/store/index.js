import Vue from 'vue'
import Vuex from 'vuex'
import shuffle from 'lodash.shuffle';

Vue.use(Vuex)

/**
 * Calculate points
 *  - 4 letter words = 1 pt
 *  - Every letter after is +1 pt
 *  - If all 7 letters are used ("pangram"), +7pts
 *  
 * @param  {[String]} words 
 * @param  {[String]} letters
 * @return {Number} points as integer
 */
const calcPoints = (words, letters) => words.reduce((totalPoints, word) => {
  let wordPoints = word.length - 3;
  let isPangram = letters.every(letter => word.includes(letter));
  if (isPangram) {
    wordPoints += 7;
  }
  return totalPoints += wordPoints
}, 0);


export default new Vuex.Store({
  state: {
    input: '',
    answers: ["habitual","halibut","abut","alibi","alit","atilt","baba","baht","bail","bait","ball","bath","bathtub","bilabial","blab","blah","blat","bubba","habit","habitat","hail","halal","hall","halt","hath","hatha","haul","hiatal","hula","labia","labial","lath","luau","tabla","tail","tali","tall","taut","that","tibia","tibial","tuba"],
    foundWords: [],
    centerLetter: 'a',
    outerLetters: ["b","h","i","l","t","u"],
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
      state.foundWords.sort();
    },
  },
  
  actions: {
  },

  getters: {
    letters: (state) => [state.centerLetter, ...state.outerLetters],
    points: (state, getters) => calcPoints(state.foundWords, getters.letters),
    possiblePoints: (state, getters) => calcPoints(state.answers, getters.letters),
  },  
})
