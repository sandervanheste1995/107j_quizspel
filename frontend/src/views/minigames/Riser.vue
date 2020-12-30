<template>
<div>
    <b-button type="is-danger" v-if="!claimed && !won && !otherTeamWon" @click="claim">Claim!</b-button>
    <h1 class="title" v-if="won">Gefeliciteerd! Jouw team heeft {{ currAmount }} euro gewonnen!</h1>
    <h1 class="title" v-if="otherTeamWon">Verdorie, team {{ otherTeamWon }} gaat er met de prijs vandoor. Ze krijgen {{ currAmount }} euro :(</h1>
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
            return this.minigame.extraData.claimedPlayers.indexOf((p: string) => p === this.$store.state.name) !== -1;
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