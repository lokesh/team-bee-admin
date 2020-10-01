<template>
  <div
    v-if="isLoaded"
    class="view"
  >

    <div class="col-gameboard">

      <div class="row-switcher">
        <puzzle-switcher class="puzzle-switcher" />
        <router-link
            to="/"
            class="user-switcher-btn icon-button"
          >
          <svg class="user-icon" width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 4C15.7909 4 14 5.79086 14 8C14 10.2091 15.7909 12 18 12C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4ZM10 8C10 3.58172 13.5817 0 18 0C22.4183 0 26 3.58172 26 8C26 12.4183 22.4183 16 18 16C13.5817 16 10 12.4183 10 8Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.15251 30.0148C5.03287 31.9385 6.83401 33.3892 9.26923 34.4038C11.9644 35.5268 15.1887 36 18 36C20.8113 36 24.0356 35.5268 26.7308 34.4038C29.166 33.3892 30.9671 31.9385 31.8475 30.0148C30.9392 28.1802 28.8246 26.6907 26.032 25.6167C23.016 24.4567 19.7598 24 18 24C16.2402 24 12.984 24.4567 9.96796 25.6167C7.17543 26.6907 5.06076 28.1803 4.15251 30.0148ZM8.53204 21.8833C12.016 20.5433 15.7598 20 18 20C20.2402 20 23.984 20.5433 27.468 21.8833C30.8684 23.1912 34.6039 25.4872 35.8974 29.3675C36.0342 29.7781 36.0342 30.2219 35.8974 30.6325C34.647 34.3836 31.568 36.7217 28.2692 38.0962C24.9644 39.4732 21.1887 40 18 40C14.8113 40 11.0356 39.4732 7.73077 38.0962C4.43198 36.7217 1.35302 34.3836 0.102633 30.6325C-0.0342111 30.2219 -0.0342111 29.7781 0.102633 29.3675C1.39609 25.4872 5.13163 23.1912 8.53204 21.8833Z" fill="black"/>
</svg>

        </router-link>

      </div>

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
import { mapState } from 'vuex';
import has from 'lodash.has';
import values from 'lodash.values';
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

  data() {
    return {
      isLoaded: false,
    };
  },

  computed: {
    ...mapState([
      'puzzles',
      'puzzleProgress',
      'puzzleId',
      'userId'
    ]),
  },

  async created() {
    // TODO: Make reusable. It'll be needed when switching puzzles

    // Switch to puzzle
    // If no puzzle is active, switch to the newest.
    let puzzleId = null;
    if (this.puzzleId) {
      puzzleId = this.puzzleId;
    } else {
      const puzzles = values(this.puzzles);
      const puzzleCount = puzzles.length;
      puzzleId =
        puzzles
          .find((puzzle, index) => puzzleCount === index + 1)
          .id;
    }

    await this.$store.dispatch('switchPuzzle', puzzleId);

    // Check if user has any prior progress on puzzle
    const progressCollection = this.puzzleProgress;
    if (!has(progressCollection, this.userId)) {
      await this.$store.dispatch('createUserPuzzleProgress', {
        puzzleId,
        userId: this.userId,
      });

      // Refetch puzzle data now that we've created progress row for user
      await this.$store.dispatch('switchPuzzle', puzzleId);
    }

    this.isLoaded = true;
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
        e.preventDefault(); // Don't scroll page down
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

.row-switcher {
  display: flex;
  gap: var(--gutter);
}

.user-switcher-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-icon {
  width: 16px;
}

.puzzle-switcher {
  flex: 1 1 auto;
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

  .user-switcher-btn {
    display: none;
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
