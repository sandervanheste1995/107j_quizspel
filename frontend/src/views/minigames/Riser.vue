<template>
<div>
    <template v-if="!minigame.started">
        <h1 class="title">{{ minigame.name }}</h1>
        <p>{{ minigame.description }}</p>
    </template>
    <template v-if="minigame.started">
        <b-button type="is-danger" class="stop-btn" v-if="!won && !otherTeamWon" :disabled="claimed" @click="claim" rounded>STOP!</b-button>
        <h1 class="title" v-if="won">Gefeliciteerd! Jouw team heeft {{ currAmount }} euro gewonnen!</h1>
        <h1 class="title" v-if="otherTeamWon">Verdorie, team {{ otherTeamWon }} gaat er met de prijs vandoor. Ze krijgen {{ currAmount }} euro :(</h1>
    </template>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
    computed: {
        ...mapGetters(['minigame', 'gameState', 'myTeam']),
        currAmount () {
            return this.minigame.extraData.currentAmount;
        },
        claimed () {
            return this.minigame.extraData.claimedPlayers.find((p: string) => p === this.$store.state.name);
        },
        won () {
            return this.minigame.extraData.teamWon === this.$store.state.team;
        },
        otherTeamWon () {
            if (this.minigame.extraData.teamWon && this.minigame.extraData.teamWon !== this.$store.state.team) {
                return this.minigame.extraData.teamWon;
            } else {
                return 0;
            }
        }
    },
    methods: {
        claim () {
            this.$store.dispatch('riserClaim');
        }
    }
});
</script>

<style lang="scss">
.stop-btn {
    font-size: 100px;
}
</style>