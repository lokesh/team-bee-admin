<template>
  <button
    type="button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'HiveButton',
}
</script>

<style scoped>
button {
  padding: 12px 16px;
  font-size: 16px;
  border: var(--border);
  border-radius: 36px;
  background: white;
}

button:hover {
  cursor: pointer;
}
button:active {
  background: var(--color-muted);
}

button:focus {
  outline: none;
}

button:focus-visible {
  border-color: var(--color-focus);
}
</style>
