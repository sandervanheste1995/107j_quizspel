<template>
  <div>
    <p>{{ gameState.viewName }}</p>
    <button @click="changeGamestate">Change game state</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default Vue.extend({
  name: 'Home',
  computed: {
    ...mapGetters(['gameState'])
  },
  methods: {
    ...mapActions(['getGameState', 'broadcastGameState']),
    changeGamestate() {
      this.broadcastGameState({
        viewName: this.gameState.viewName === 'Home' ? 'WoordenMinigame' : 'Home'
      });
    }
  },
  created () {
   this.getGameState();
  }
});
</script>
