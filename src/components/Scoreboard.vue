<template>
  <div class="wrapper">
    <div class="scoreboard">
      <div class="msg-score">
        <template v-if="foundWords.length === 1">
          1 word and {{ points }} points
        </template>
        <template v-else>
          {{ foundWords.length}} words and {{ points }} points
        </template>
      </div>
      <div class="msg-max">
        {{ answers.length }} words and {{ possiblePoints }} points available
      </div>

      <genius-bar class="genius-bar" />

      <div class="list">
        <div
          v-for="(word, i) in foundWords"
          :key="i"
          class="word"
        >
          {{ word }}
        </div>
      </div>

      <div class="hint-bar">
        <button>
          Turn on Hint
        </button>
        <button>
          Reveal answers
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import GeniusBar from '@/components/GeniusBar';

export default {
  name: 'Scoreboard',

  components: {
    GeniusBar,
  },

  computed: {
    ...mapGetters([
      'points',
      'possiblePoints',
    ]),
    ...mapState([
      'answers',
      'foundWords',
    ]),
  },
}
</script>

<style scoped>
.wrapper {
  padding: var(--gutter);
}

.msg-score {
  margin-bottom: calc(var(--gutter) / 2);
}

.msg-max {
  margin-bottom: calc(var(--gutter) / 2);
  color: var(--color-secondary);
}

.genius-bar {
  margin-bottom: calc(var(--gutter) / 2);
}

.scoreboard {
  padding: var(--gutter);
  border: var(--border);
  border-radius: var(--radius);
}

.list {
  display: flex;
  max-height: 400px;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
}

.word {
  min-width: 6em;
  padding: 0.4em 0;
  margin-right: calc(var(--gutter) / 2);
  border-bottom: var(--border-inline);
  font-size: 18px;
  text-transform: capitalize;
}

.word:last-of-type {
  border-bottom: none;
}
</style>
