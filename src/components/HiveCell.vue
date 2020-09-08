<template>
  <svg
    class="hive-cell"
    :class="{
      'center': center,
      'outer': !center,
    }"
    viewBox="0 0 120 103.92304845413263"
    @click="onClick"
  >
    <polygon
      class="shape"
      points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
      stroke="white"
      stroke-width="7.5"
    />
    <text
      class="letter"
      x="50%"
      y="50%"
      dy="0.3em"
    >
      {{ letter }}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'HiveCell',

  props: {
    letter: {
      type: String,
      required: true,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      this.$store.commit('addInputLetter', this.letter);
    },
  },
};
</script>

<style scoped>
.shape {
  fill: var(--color-muted);
  transform-origin: center center;
  transition:
    transform 0.1s,
    fill 0.1s;
}

.shape:active {
  transform: scale(0.85);
  fill: var(--color-muted-dark);
}


.letter {
  text-anchor: middle;
  font-weight: var(--weight-bold);
  font-size: 36px;
  text-transform: uppercase;
  user-select: none;
  pointer-events: none;
}

.center .shape {
  fill: var(--color-primary);
}
</style>
