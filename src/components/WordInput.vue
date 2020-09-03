<!-- 
Fake input, mimicking NYT execution.
Not sure how a keyboard only user would be able to use this. Odd decision on
their part.
-->
<template>
  <div class="input">
    
    <span
      class="string"
     >
      {{ input }}
    </span>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'WordInput',

  computed: {
    ...mapState([
      'input',
    ]),
  }, 
}
</script>

<style scoped>
.input {
  text-align: center;
}
.string {
  font-size: 32px;
  font-weight: var(--weight-bold);
  text-align: center;
  text-transform: uppercase;
}
</style>
