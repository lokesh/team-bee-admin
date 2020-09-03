<template>
  <div id="app">

    <hive />
    <word-list />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Hive from './components/Hive.vue';
import WordList from './components/WordList.vue'

export default {
  name: 'App',
  components: {
    Hive,
    WordList,
  },

  computed: {
    ...mapState([
      // 'centerLetter',
      // 'outerLetters',
    ]),
  }, 

  mounted() {
    // 'keypress' event doesn't support 'delete' key
    document.addEventListener('keydown', this.onKey)
  },

  destroyed() {
    document.removeEventListener('keydown', this.onKey)
  },

  methods: {
    onKey(e) {
        if (e.keyCode === 8 || e.keyCode === 46) {  // Backspace and Delete
          this.$store.commit('removeLetter');         
        
        } else if (e.keyCode > 64 && e.keyCode < 91) { // A-Z
          this.$store.commit('addLetter', e.key);  

        } else if (e.keyCode === 13) { // Enter
          // TODO: Submit
        
        } else if (e.keyCode === 32) { // Space
          this.$store.commit('shuffle');  
        }
    },
  },
}
</script>

<style>
@import "./styles/base.css";
</style>

