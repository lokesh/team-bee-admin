<template>
  <div class="wrapper">
    <div class="scoreboard">

      <div class="user-bar">
        <segmented-control
          :value="teamMode"
          :options="[
              { label: userName, value: false },
              { label: 'Team', value: true },
          ]"
          class="team-control"
          @input="toggleSetting('teamMode')"
        />
        <router-link
            class="text-button"
            to="/"
          >
          Switch user
        </router-link>
      </div>

      <div
        class="msg-score"
      >
        <template v-if="displayFoundWordsCount === 1">
          1 word and {{ displayPoints }} points
        </template>
        <template v-else>
          {{ displayFoundWordsCount}} words and {{ displayPoints }} points
        </template>
      </div>
      <div class="msg-max">
        {{ puzzle.answers.length }} words and {{ possiblePoints }} points available
      </div>

      <genius-bar
        class="genius-bar"
        :points="displayPoints"
        :possible-points="possiblePoints"
      />

      <div class="list">
        <div
          v-for="row in displayList"
          :key="row.word"
          class="list-row"
        >
          <div
            :class="{ 'hint': hintCheck(row.word) }"
          >
          {{ row.word }}
          </div>

          <div
            class="tags"
            v-if="teamMode"
          >
            <user-tag
              v-for="user in row.users"
              :user-id="user"
              :key="`user-${user}`"
            />
          </div>
        </div>
      </div>

      <div class="hint-bar">
        <button
          class="hint-button"
          :class="{ 'toggled': hint }"
          @click="toggleSetting('hint')"
        >
          Hints
        </button>
        <button
          class="hint-button"
          :class="{ 'toggled': revealed }"
          @click="toggleSetting('revealed')"
        >
          Reveal answers
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import filter from 'lodash.filter';
import GeniusBar from '@/components/GeniusBar';
import SegmentedControl from '@/components/SegmentedControl';
import UserTag from '@/components/UserTag';

export default {
  name: 'Scoreboard',

  components: {
    GeniusBar,
    SegmentedControl,
    UserTag,
  },

  computed: {
    ...mapGetters([
      'foundWords',
      'teamFoundWords',
      'hint',
      'points',
      'teamPoints',
      'possiblePoints',
      'puzzle',
      'revealed',
      'teamMode',
    ]),

    ...mapState([
      'puzzleProgress',
      'users',
      'userId',
    ]),

    displayPoints() {
      return this.teamMode ? this.teamPoints : this.points;
    },

    displayFoundWordsCount() {
      return this.teamMode ? this.teamFoundWords.length : this.foundWords.length;
    },

    displayList() {
      // If hints or reveal, show all
      if (this.hint || this.revealed) {
        return this.list;
      } else {
        // If team, show team finds.
        // If solo, show user finds.
        if (this.teamMode) {
          return this.teamList;
        } else {
          return this.soloList;
        }
      }
    },

    /**
     * Returns array of all words and which users have found them
     * @return {[Object]} row
     * @return {String}   row.word
     * @return {[Number]} row.users
     */
    list() {
      return this.puzzle.answers.map(word => {
        let users = [];
        filter(this.puzzleProgress, (progress, userId) => {
          if (progress.found_words.includes(word)) {
            users.push(parseInt(userId))
          }
        })
        return {
          word,
          users,
        }
      })
    },

    soloList() {
      return this.list.filter(row => {
        return row.users.includes(this.userId);
      })
    },

    teamList() {
      return this.list.filter(row => {
        return row.users.length;
      })
    },

    userName() {
      return this.users[this.userId].name;
    },
  },

  methods: {
    toggleSetting(setting) {
      this.$store.dispatch('toggleSetting', setting);
    },

    hintCheck(word) {
      if (this.revealed) {
        return false;
      } else if (this.teamMode) {
        return !this.teamList.find(row => row.word === word);
      } else {
        return !this.soloList.find(row => row.word === word);
      }
    }
  },
};
</script>

<style scoped>
.wrapper {
  padding: var(--gutter);
}

.scoreboard {
  padding: var(--gutter);
  border: var(--border);
  border-radius: var(--radius);
}

.user-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gutter);
}

.msg-score {
  margin-bottom: calc(var(--gutter) / 3);
}

.msg-max {
  margin-bottom: calc(var(--gutter) / 2);
  color: var(--color-secondary);
}

.genius-bar {
  margin-bottom: calc(var(--gutter) / 2);
}

.list {
  display: flex;
  height: 60vh;
  margin-bottom: var(--gutter);
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-x: auto;
}

.list-row {
  display: flex;
  justify-content: space-between;
  min-width: 8em;
  padding: 0.4em 0;
  margin-right: calc(var(--gutter) / 2);
  border-bottom: var(--divider);
  font-size: 18px;
  text-transform: capitalize;
}

.tags {
  display: flex;
  flex-direction: row-reverse;
  gap: 4px;
  margin-left: var(--gutter);
}

.hint {
  background: var(--color);
}

.hint-bar {
  display: flex;
  justify-content: space-between;
}

.hint-button {
  position: relative;
  left: -4px;
  padding: 4px 8px;
  border: 0;
  border-radius: var(--radius-sm);
  color: var(--color-secondary);
}

.hint-button:hover {
  color: var(--color);
  background-color: var(--color-muted);
}

.hint-button.toggled {
  color: var(--color);
  background-color: var(--color-primary);
}
</style>
