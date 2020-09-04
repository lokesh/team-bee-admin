<template>
  <div id="app">
    <word-input />
    <div style="width: 320px">
      <hive />
    </div>
    <scoreboard />
  </div>
</template>

<script>
import Hive from './components/Hive.vue';
import Scoreboard from './components/Scoreboard.vue'
import WordInput from './components/WordInput.vue';

export default {
  name: 'App',
  components: {
    Hive,
    Scoreboard,
    WordInput,
  },

  mounted() {
    document.addEventListener('keydown', this.onKey)
  },

  destroyed() {
    document.removeEventListener('keydown', this.onKey)
  },

  methods: {
    onKey(e) {
        // Note: Enter key is handled in WordInput.vue
        
        if (e.keyCode === 8 || e.keyCode === 46) {  // Backspace and Delete
          this.$store.commit('removeInputLetter');         
        
        } else if (e.keyCode > 64 && e.keyCode < 91) { // A-Z
          this.$store.commit('addInputLetter', e.key);  

        } else if (e.keyCode === 32) { // Space
          this.$store.commit('shuffleOuterLetters');  
        }
    },
  },
}
</script>

<style>
@import "./styles/base.css";
</style>

