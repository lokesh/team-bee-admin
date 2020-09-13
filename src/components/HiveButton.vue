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
