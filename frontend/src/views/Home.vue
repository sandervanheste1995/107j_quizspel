<template>
  <div class="centered-content">
    <div v-if="!$store.state.name || gameState.viewName === 'Home'" class="home-content">
      <h1 class="title">Welkom bij het 107J Nieuwjaarsspel!</h1>
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
                v-for="team in [1, 2, 3]"
                :value="team"
                :key="team">
                {{ 'Team ' + ' ' + team }}
            </option>
          </b-select>
        </b-field>
        <b-button rounded type="is-dark" :disabled="name.length < 3" @click="setNameTeam">Doe mee!</b-button>
      </template>

      <template v-else>
        <p class="has-text-weight-bold">Welkom, {{ $store.state.name }} uit team {{ $store.state.team }}</p>
      </template>

    </div>
    <raad-de-woorden v-else-if="gameState.viewName === 'Woordenspel'"></raad-de-woorden>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import RaadDeWoorden from './minigames/RaadDeWoorden.vue';
import mutations from '../store/mutations';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    name: '',
    team: 1
  }),
  components: {
    RaadDeWoorden
  },
  computed: {
    ...mapGetters(['gameState'])
  },
  methods: {
    setNameTeam () {
      this.$store.commit(mutations.setUser, { name: this.name, team: this.team });
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
