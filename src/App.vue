<template>
  <div id="app">
    <word-input />
    <div style="width: 320px">
      <hive />
    </div>
    <word-list />
  </div>
</template>

<script>
import Hive from './components/Hive.vue';
import WordInput from './components/WordInput.vue';
import WordList from './components/WordList.vue'

export default {
  name: 'App',
  components: {
    Hive,
    WordInput,
    WordList,
  },

  mounted() {
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

