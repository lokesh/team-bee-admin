<template>
  <div>
    <section>
      <custom-puzzle-form />
    </section>

    <section>
      <random-generator />
    </section>
  </div>
</template>

<script>
import CustomPuzzleForm from '@/components/CustomPuzzleForm';
import RandomGenerator from '@/components/RandomGenerator';

export default {
  name: 'CreateView',

  components: {
    CustomPuzzleForm,
    RandomGenerator,
  },
}
</script>

<style scoped>
section {
  padding-bottom: 24px;
  border-bottom: var(--border);
  margin-bottom: 36px;
}
</style>
