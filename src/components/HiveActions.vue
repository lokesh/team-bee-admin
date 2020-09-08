<template>
  <div class="row">
    <hive-button
      class="button"
      @click="onDelete"
    >
      Delete
    </hive-button>
    <hive-button
      class="button"
      @click="onShuffle"
    >
      Shuffle
    </hive-button>
    <hive-button
      class="button"
      @click="onEnter"
    >
      Enter
    </hive-button>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import HiveButton from './HiveButton';

export default {
  name: 'HiveActions',

  components: {
    HiveButton,
  },

  methods: {
    onDelete() {
      this.$store.commit('removeInputLetter');
    },
    
    onEnter() {
      EventBus.$emit('submitInput');
    },

    onShuffle() {
      this.$store.commit('shuffleOuterLetters');
    },
  },
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
}

.button {
  margin-right: 24px;
}

.button:last-of-type {
  margin-right: 0;
}
</style>
