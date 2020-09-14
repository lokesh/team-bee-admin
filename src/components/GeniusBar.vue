<template>
    <div>
        <div v-if="false" class="flag">
          Genius
        </div>
        <div class="rail">
          <div
            class="rail-fill"
            :style="`transform: scaleX(${percentComplete})`"
          >
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'GeniusBar',

    computed: {
      ...mapGetters([
        'points',
        'possiblePoints',
      ]),

      percentComplete() {
        return (this.points / this.possiblePoints).toFixed(2);
      }
    },
}
</script>

<style scoped>
.rail {
  position: relative;
  overflow: hidden;
  height: 24px;
  border-radius: var(--radius-sm);
  background: var(--color-muted);
}

.rail-fill {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--color-primary);
  transform-origin: left;
  transition: 0.5s all;
}
</style>
