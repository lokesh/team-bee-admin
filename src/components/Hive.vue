<template>
  <div class="hive">
    HIVE
    <hive-cell letter="o" />
    <hive-cell letter="e" />
  </div>
</template>

<script>
import HiveCell from './HiveCell.vue';

export default {
  name: 'Hive',

  components: {
    HiveCell,
  },
}
</script>

<style scoped>
.hive {
	max-width: 320px;
}
</style>
