<template>
  <div id="app" class="container">
      <router-view />
      <p class="team-overlay" v-if="team">Team {{ team }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  created () {
    this.$store.dispatch('getGameState');

    // // extra voorzorgsmaatregel: update de gamestate elke 8 seconde
    setInterval(() => {
      this.$store.dispatch('getGameState');
    }, 8000);
  },
  computed: {
    team () {
      return this.$store.state.team;
    }
  }
});
</script>

<style lang="scss">
.wrapper, html, body, #app {
    height: 100%;
    margin: 0 auto;
}

body {
  background: $secondary;
}

p, h1, h2, h3 {
  color: white !important;
}

input {
  padding: 0.35rem;
  font-size: 24px;
  font-weight: bold;
}

.error {
  color: darkred !important;
  font-weight: bold;
}

.team-overlay {
  position: absolute;
  right: 14px;
  bottom: 14px;
  color: white;
  font-weight: bold;
}

* {
  text-align: center;
}

.field {
  width: 100%;
}

.centered-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  .control {
    margin: 0 auto;
  }
}

//animations
.list-slide-enter-active, .list-slide-leave-active {
  transition: all 0.85s;
}
.list-slide-enter, .list-slide-leave-to  {
  transform: translateY(100vh);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>