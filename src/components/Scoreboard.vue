<template>
  <div class="wrapper">
    <div class="scoreboard">
      <segmented-control
        v-model="teamMode"
        :options="[
            { label: 'Solo', value: false },
            { label: 'Team', value: true },
        ]"
        class="team-control"
      />
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
        <button
          class="text-button"
        >
          Hints
        </button>
        <button
          class="text-button"
        >
          Reveal answers
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import GeniusBar from '@/components/GeniusBar';
import SegmentedControl from '@/components/SegmentedControl';

export default {
  name: 'Scoreboard',

  components: {
    GeniusBar,
    SegmentedControl,
  },

  data() {
    return {
      teamMode: false,
    };
  },

  computed: {
    ...mapGetters([
      'foundWords',
      'points',
      'possiblePoints',
    ]),
    ...mapState([
      'answers',
    ]),
  },
}
</script>

<style scoped>
.wrapper {
  padding: var(--gutter);
}

.team-control {
  margin-bottom: var(--gutter);
}

.msg-score {
  margin-bottom: calc(var(--gutter) / 3);
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
  height: 60vh;
  margin-bottom: var(--gutter);
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

.hint-bar {
  display: flex;
  justify-content: space-between;
}
</style>
