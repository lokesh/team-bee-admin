<template>
  <div class="hive">
    <word-input />
    <hive-cell
      v-for="(letter, i) in outerLetters"
      :key="i"
      :letter="letter"
    />
    <hive-cell
      :letter="centerLetter"
      center
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HiveCell from './HiveCell.vue';
import WordInput from './WordInput.vue';

export default {
  name: 'Hive',

  components: {
    HiveCell,
    WordInput,
  },

  computed: {
    ...mapState([
      'centerLetter',
      'outerLetters',
    ]),
  }, 
}

</script>

<style scoped>
.hive {
	max-width: 320px;
}
</style>
