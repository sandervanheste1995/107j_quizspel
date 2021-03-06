<template>
    <div class="p-3 admin-content">
        <div v-if="!gameState.minigameData">
            <b-field label="Laad een minigame">
                <b-select placeholder="Selecteer een minigame" v-model="selectedMinigame">
                    <option
                        v-for="minigame in minigames"
                        :value="minigame.id"
                        :key="minigame.id">
                        {{ minigame.type + ' - ' + minigame.name }}
                    </option>
                </b-select>
            </b-field>
            <b-button @click="laadMinigame">Laad minigame</b-button>
        </div>

        <div v-if="gameState.minigameData">
            <b-field>{{gameState.minigameData.name}}</b-field>
            <b-button @click="startPauzeMinigame">{{ gameState.minigameData.started ? 'Pauzeer' : 'Start' }} minigame</b-button>
            <b-button class="ml-3" @click="stopMinigame">Stop minigame</b-button>
        </div>

        <div class="pt-5">
            <b-field label="Selecteer aantal teams" v-if="teamsEmpty">
                <b-select v-model="numberOfTeams" @change.native="setNumberOfTeams">
                    <option
                        v-for="num in 8"
                        :value="num"
                        :key="num">
                        {{ num }}
                    </option>
                </b-select>
            </b-field>

            <div v-if="gameState.viewName === 'Quiz'">
                <b-button @click="() => quizSchermDelta(-1)" class="m-2" type="is-info">Vorige scherm</b-button>
                <b-button @click="() => quizSchermDelta(1)" class="m-2" type="is-info">Volgende scherm</b-button>
            </div>

            <div v-if="guesserDoneVoting && this.minigame.extraData.playerQueue.length">
                <b-button @click="guesserNextPlayer" class="m-2" type="is-info">Volgende speler</b-button>
            </div>

            <b-button @click="resetSpel" class="resetButton" type="is-danger">Reset spel</b-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
    data: () => ({
        minigames: [],
        selectedMinigame: 1,
        numberOfTeams: 3
    }),
    computed: {
        ...mapGetters(['gameState', 'teamsEmpty', 'minigame']),
         guesserDoneVoting () {
            return this.gameState?.viewName === 'Guesser' && 
                   this.minigame?.extraData?.votes?.length === this.minigame?.extraData?.numberOfPlayers - 2;
        }
    },
    async created () {
        this.minigames = await this.$store.dispatch('getMinigames');
    },
    methods: {
        setNumberOfTeams () {
            this.$store.dispatch('setNumberOfTeams', this.numberOfTeams);
        },
        laadMinigame () {
            this.$store.dispatch('laadMinigame', this.selectedMinigame);
        },
        startPauzeMinigame () {
            this.$store.dispatch('startPauzeMinigame');
        },
        stopMinigame () {
            this.$store.dispatch('stopMinigame');
        },
        resetSpel () {
            const result = confirm('Weet je zeker dat je het spel wilt resetten?');
            if(result){
                this.$store.dispatch('reset');
            }
        },

        // minigame-specifieke knoppen
        quizSchermDelta (delta: number) {
            this.$store.dispatch('quizSchermDelta', delta);
        },
        guesserNextPlayer () {
            this.$store.dispatch('guesserNextPlayer');
        }
    }
});
</script>

<style lang="scss" scoped>
.admin-content {
    background: white;
    border-radius: 20px;
}

.resetButton {
    float: right;
    position: relative;
    left: -15px;
    bottom: 45px;
}
</style>