<template>
    <div>
        <template v-if="!minigame.started">
            <h1 class="title">{{ minigame.name }}</h1>
            <p>{{ minigame.description }}</p>
        </template>

        <template v-else-if="minigame.extraData.numberOfPlayers < 3">
            <h1 class="title">Voor dit spel zijn tenminste 3 spelers nodig</h1>
        </template>

        <h1 class="title" v-else-if="!minigame.extraData.playerQueue.length">Iedereen is aan de beurt geweest!</h1>

        <template v-else-if="!doneVoting">
            <template v-if="isTyper && ((isPlayer && !minigame.extraData.playerText) || (!isPlayer && !minigame.extraData.imitatorText))">
                <b-field :label="isPlayer ? 
                'Typ iets waardoor mensen jouw tekst herkennen!' :
                 `Probeer te doen alsof je ${minigame.extraData.playerQueue[0]} bent!` ">
                    <b-input maxlength="100" type="textarea" class="area" v-model="message"></b-input>
                </b-field>
                <b-button type="is-info" style="font-weight: bold; font-size: 24px;" @click="sendText" rounded>Bevestig</b-button>
            </template>
            <template v-else-if="isTyper">
                <h1 class="title is-4">{{ isPlayer ? 'Nou, duimen maar...hopelijk heb je iets herkenbaars getypt!' : 'Jaja, nu hopen dat de anderen erin trappen hehe'}}</h1>
            </template>
            <template v-else>
                <template v-if="typingDone">
                    <div>
                        <b-button type="is-info" class="choose-btn" v-if="!voted" @click="voteLeft" rounded>{{this.minigame.extraData.playerQueue[0]}}'s tekst is boven!</b-button>
                     </div>
                     <div style="margin-top: 10vh;">
                        <b-button type="is-info" class="choose-btn" v-if="!voted" @click="voteRight" rounded>{{this.minigame.extraData.playerQueue[0]}}'s tekst is onder!</b-button>
                     </div>
                </template>
                <template v-else>
                    <h1 class="title">{{this.minigame.extraData.playerQueue[0]}} is aan het typen, en {{this.minigame.extraData.imitatorQueue[0]}} probeert deze te imiteren...
                    </h1>
                </template>
            </template>
        </template>

        <template v-else>
            <h1 class="title">De stemmen zijn binnen!</h1>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
    data: () => ({
        message: '',
        hasSent: false
    }),
    computed: {
        ...mapGetters(['minigame']),
        isTyper () {
            return this.minigame.extraData.playerQueue[0] === this.$store.state.name 
                || this.minigame.extraData.imitatorQueue[0] === this.$store.state.name
        },
        isPlayer () {
            return this.minigame.extraData.playerQueue[0] === this.$store.state.name 
        },
        voted () {
            return this.minigame.extraData.votes.find((v: any) => v.playerId === this.$store.state.name);
        },
        typingDone () {
            return this.minigame.extraData.playerText && this.minigame.extraData.imitatorText;
        },
        doneVoting () {
            return this.minigame.extraData.votes.length === this.minigame.extraData.numberOfPlayers - 2;
        },
    },
    methods: {
        voteLeft () {
            this.$store.dispatch('vote', false);
        },
        voteRight () {
            this.$store.dispatch('vote', true);
        },
        sendText () {
            this.$store.dispatch('sendText', this.message);
        }
    }
});
</script>

<style lang="scss">
.area {
    width: 85vw;
    * {
        font-weight: bold !important;
    }
}

.choose-btn {
    font-weight: bold;
    font-size: 18pt;
}
</style>