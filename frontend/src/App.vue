<template>
  <div id="app" class="container">
      <router-view />
  </div>
</template>

<style>
.wrapper, html, body, #app {
    height: 100%;
    margin: 0;
}

* {
  text-align: center;
}

.centered-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>