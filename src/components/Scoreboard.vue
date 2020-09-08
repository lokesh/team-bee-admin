<template>
  <div class="wrapper">
    <div class="scoreboard">
      <p class="msg-score">
        <template v-if="foundWords.length === 1">
          1 word and {{ points }} points
        </template>
        <template v-else>
          {{ foundWords.length}} words and {{ points }} points
        </template>
      </p>
      <p class="msg-max">
        Out of a possible {{ answers.length }} words and {{ possiblePoints }} points
      </p>

      <div class="list">
        <div
          v-for="(word, i) in foundWords"
          :key="i"
          class="word"
        >
          {{ word }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Scoreboard',

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
  padding: 24px;
}

.msg {
  margin-bottom: 24px;
}

.msg-max {
  color: var(--color-secondary);
}

.scoreboard {
  padding: 24px;
  border: var(--border);
  border-radius: var(--radius);
}

.list {

}

.word {
  padding: 0.4em;
  border-bottom: var(--border-inline);
  font-size: 18px;
  text-transform: capitalize;
}

.word:last-of-type {
  border-bottom: none;
}
</style>
