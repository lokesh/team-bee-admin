<template>
  <div class="page">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Date</th>
          <th></th>
          <th></th>
          <th>Pts</th>
          <th>Answers</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="puzzle in puzzlesArray"
          :key="`puzzle-${puzzle.id}`"
        >
          <td>{{ puzzle.id }}</td>
          <td style="width: 8em;">{{ puzzle.date.substr(0, 10) }}</td>
          <td>{{ puzzle.center_letter }}</td>
          <td style="width: 8em">{{ puzzle.outer_letters.join(', ') }}</td>
          <td>{{ calcPoints(puzzle.answers) }}</td>
          <td>
            <div style="font-weight: bold">{{ puzzle.answers.length }} words</div>
          {{ puzzle.answers.join(', ') }}
          </td>
          <td>
            <button
              @click="deletePuzzle(puzzle.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { calcPoints } from '@/utils';

export default {
  name: 'LoginView',

  computed: {
    ...mapState([
      'puzzles',
    ]),

    ...mapGetters([
     'puzzlesArray',
    ]),
  },

  data() {
    return {
      calcPoints,
    }
  },

  methods: {
    deletePuzzle(id) {
      this.$store.dispatch('deletePuzzle', id);
    },
  },
}
</script>

<style scoped>
.row {
  display: flex;
  gap: var(--gutter);
  align-items: flex-end;
  margin-bottom: var(--gutter);
}
</style>
