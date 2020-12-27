<template>
  <div>
    <p>{{ gameState.viewName }}</p>
    <button @click="changeGamestate">Verander de gamestate</button>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    message: ''
  }),
  computed: {
    ...mapGetters(['gameState'])
  },
  methods: {
    ...mapActions(['getGameState', 'broadcastGameState']),
    changeGamestate() {
      this.broadcastGameState({
        viewName: this.gameState.viewName === 'Home' ? 'WoordenMinigame' : 'Home'
      });
      this.message = 'Bericht verzonden!'
    }
  },
  created () {
   this.getGameState();
  }
});
</script>
