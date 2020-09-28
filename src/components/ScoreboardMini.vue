<template>
  <div class="scoreboard">
    <div class="msg-score">
      <template v-if="foundWords.length === 1">
        1 word and {{ points }} points
      </template>
      <template v-else>
        {{ foundWords.length}} words and {{ points }} points
      </template>
    </div>
    <genius-bar
      :points="displayPoints"
      :possible-points="possiblePoints"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GeniusBar from '@/components/GeniusBar';

export default {
  name: 'Scoreboard',

  components: {
    GeniusBar,
  },

  computed: {
    ...mapGetters([
      'foundWords',
      'points',
      'possiblePoints',
      'teamFoundWords',
      'teamMode',
      'teamPoints',
    ]),

    displayPoints() {
      return this.teamMode ? this.teamPoints : this.points;
    },

  },
}
</script>

<style scoped>
.scoreboard {
  padding: var(--gutter);
  border: var(--border);
  border-radius: var(--radius);
}

.msg-score {
  margin-bottom: 8px;
}
</style>
