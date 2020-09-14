<template>
  <div class="view">
  
    <div class="col-gameboard">
      <puzzle-switcher class="puzzle-switcher" />
      <scoreboard-mini class="scoreboard-mini" />
      <hive-input class="hive-input" />    
      <div class="hive-positioner">
        <div class="hive-sizer">
          <hive />
        </div>
      </div>
      <hive-actions class="hive-actions" />    
    </div>

    <scoreboard class="col-scoreboard" />
  </div>
</template>

<script>
import EventBus from '@/event-bus.js';
import Hive from '@/components/Hive.vue';
import HiveActions from '@/components/HiveActions.vue';
import HiveInput from '@/components/HiveInput.vue';
import PuzzleSwitcher from '@/components/PuzzleSwitcher.vue'
import Scoreboard from '@/components/Scoreboard.vue'
import ScoreboardMini from '@/components/ScoreboardMini.vue'

export default {
  name: 'GameView',
  
  components: {
    Hive,
    HiveActions,
    HiveInput,
    PuzzleSwitcher,
    Scoreboard,
    ScoreboardMini,
  },

  mounted() {
    document.addEventListener('keydown', this.onKey)
  },

  destroyed() {
    document.removeEventListener('keydown', this.onKey)
  },

  methods: {
    onKey(e) {
      // Note: Enter key is handled in HiveInput.vue

      if (e.keyCode === 8 || e.keyCode === 46) {  // Backspace and Delete
        this.$store.commit('removeInputLetter');         
      
      } else if (e.keyCode > 64 && e.keyCode < 91) { // A-Z        
        EventBus.$emit('letterKeyPress', e.key.toLocaleLowerCase());
        this.$store.commit('addInputLetter', e.key);  

      } else if (e.keyCode === 32) { // Space
        this.$store.commit('shuffleOuterLetters');  
      
      } else if (e.keyCode === 27) { // Esc
        this.$store.commit('clearUser');
        this.$router.push({ name: 'Login' });
      }
    },
  },
}
</script>

<style scoped>
.col-gameboard {
  padding: var(--gutter);
}

.col-scoreboard {
  display: none;
}

.puzzle-switcher {
  margin-bottom: var(--gutter);
}

.hive-input {
  margin-bottom: var(--gutter);
}

.hive-positioner {
  display: flex;
  justify-content: center;
  margin-bottom: var(--gutter);
}

.hive-sizer {
  flex: 1 1 auto;
  max-width: 280px;
}

@media (min-width: 640px) {
  .view {
    display: flex;
  }

  .col-gameboard {
    flex: 0 1 420px;
  }

  .scoreboard-mini {
    display: none;
  }

  .hive-wrapper {
    max-width: auto;
  }

  .col-scoreboard {
    display: block;
    flex: 1 1 auto;
  }
}
</style>
