<template>
  <div class="centered-content">
    <div v-if="!$store.state.name || gameState.viewName === 'Home'" class="home-content">
      <h1 class="title">Welkom bij het Jean en Sandy Verjaardagsspel!</h1>
      <b-icon
        pack="fas"
        icon="glass-cheers"
        size="is-large">
      </b-icon>

      <template v-if="!$store.state.name">
        <b-field label="Je naam" class="pt-5">
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="Je team" class="pb-5">
          <b-select placeholder="Selecteer een team" v-model="team">
            <option 
                v-for="team in teamCount"
                :value="team"
                :key="team">
                {{ teamName(team) }}
            </option>
          </b-select>
        </b-field>
        <b-button rounded type="is-dark" :disabled="name.length < 3" @click="setNameTeam">Doe mee!</b-button>
      </template>

      <template v-else>
        <p class="has-text-weight-bold">Welkom, {{ $store.state.name }} uit team {{ $store.state.team }}</p>
      </template>

    </div>
    <raad-de-woorden v-else-if="gameState.viewName === 'Woordenspel'" />
    <quiz v-else-if="gameState.viewName === 'Quiz'" />
    <riser v-else-if="gameState.viewName === 'Riser'" />
    <guesser v-else-if="gameState.viewName === 'Guesser'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import mutations from '@/store/mutations';
import RaadDeWoorden from './minigames/RaadDeWoorden.vue'
import Quiz from './minigames/Quiz.vue';
import Riser from './minigames/Riser.vue'
import Guesser from './minigames/Guesser.vue';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    name: '',
    team: 1
  }),
  components: {
    RaadDeWoorden,
    Quiz,
    Riser,
    Guesser
  },
  computed: {
    ...mapGetters(['gameState', 'teamCount', 'teamName'])
  },
  methods: {
    setNameTeam () {
      this.$store.commit(mutations.setUser, { name: this.name, team: this.team });
      this.$store.dispatch('setPlayer');
    }
  }
});
</script>

<style lang="scss" scoped>
.home-content {
  background: $primary;
  padding: 1rem;
  border-radius: 20px;
}
</style>
