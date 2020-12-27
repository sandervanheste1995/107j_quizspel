<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'Home',
  computed: {
    ...mapState({
      message: 'message'
    })
  },
  methods: {
    ...mapActions(['getMessage']),
  },
  created () {
   this.getMessage();
  }
});
</script>
