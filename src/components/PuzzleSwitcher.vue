<template>
  <div class="switcher">
    <div class="name">
      September 15, 2020
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PuzzleSwitcher',

  computed: {
    ...mapGetters([
      'points',
      'pointsForGenius',
    ]),
  },
}
</script>

<style scoped>
.switcher {
  padding: var(--gutter);
  border: var(--border);
  border-radius: var(--radius);
}

.name {
  font-size: 18px;
}


@media (min-width: 640px) {
  .switcher {
    padding: 0;
    margin-bottom: var(--gutter);
    border: 0;
  }

  .name {
    font-size: 20px;
  }
}
</style>
