<template>
  <div id="app" class="container">
      <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  created () {
    this.$store.dispatch('getGameState');

    // extra voorzorgsmaatregel: update de gamestate elke 8 seconde
    // setInterval(() => {
    //   this.$store.dispatch('getGameState');
    // }, 8000);
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

.error {
  color: darkred !important;
  font-weight: bold;
}

* {
  text-align: center;
  user-select: none;
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
</style>