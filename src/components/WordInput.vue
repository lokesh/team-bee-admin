<!-- 
Fake input, mimicking NYT execution.
Not sure how a keyboard only user would be able to use this. Odd decision on
their part.
-->
<template>
  <div
    ref="input"
    class="input"
    @animationend="onAnimationEnd"
  >
    
    <span
      v-for="(letter, i) in letters"
      :key="i"
      class="letter"
      :class="{
        'letter': true,
        'letter--center': letter === centerLetter,
        'letter--invalid': ![centerLetter, ...outerLetters].includes(letter),
      }"
     >
      {{ letter }}
    </span>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'WordInput',

  computed: {
    ...mapState([
      'answers',
      'centerLetter',
      'foundWords',
      'input',
      'outerLetters',
    ]),

    letters() {
      return this.input.split('');
    },
  }, 

  mounted() {
    document.addEventListener('keydown', this.onKey);
  },

  destroyed() {
    document.removeEventListener('keydown', this.onKey);
  },

  methods: {
    onKey(e) {
      if (e.keyCode !== 13) return; 
      // Enter pressed

      // Too short
      if (this.input.length < 4) {
        this.shake();
      
      } else if (!this.input.includes(this.centerLetter)) { 
        // Missing center letter
        this.shake(); 
  
      } else if (this.foundWords.includes(this.input)) {     
        // Already found
        this.shake();
      
      } else if (!this.answers.includes(this.input)) {
        // Not in word list
        this.shake(); 
      
      } else {     
        // Good!
        this.$store.commit('addFoundWord', this.input);
        this.$store.commit('clearInput');
      }
      
    },
    
    onAnimationEnd() {
      this.$refs.input.classList.remove('input--error');
      this.$store.commit('clearInput');
    },

    shake() {
      this.$refs.input.classList.add('input--error');
    },  
  },
}
</script>

<style scoped>
.input {
  display: flex;
  justify-content: center;
  font-size: 36px;
  font-weight: var(--weight-bold);
  text-align: center;
  text-transform: uppercase;
}

.input--error {
  animation: shake 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) both
}

.letter--center {
  color: var(--color-primary);
}

.letter--invalid {
  color: var(--color-secondary);
}

@keyframes shake {
    10%,90% {
        transform: translate3d(-1px, 0, 0)
    }

    20%,80% {
        transform: translate3d(2px, 0, 0)
    }

    30%,50%,70% {
        transform: translate3d(-4px, 0, 0)
    }

    40%,60% {
        transform: translate3d(4px, 0, 0)
    }
}

</style>
