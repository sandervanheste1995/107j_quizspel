<template>
    <div>
         <h1 v-if="!minigame.started" class="title">Bereid jullie voor!</h1>
         <h1 v-else-if="minigame.extraData.numberOfPlayers < 3">Voor dit spel zijn tenminste 3 spelers nodig!</h1>
         <template v-else-if="minigame.extraData.playerQueue.length">
             <h1 class="title my-5">Welke van de volgende teksten heeft {{ minigame.extraData.playerQueue[0] }} getypt? </h1>
             <div>
                <div class="vote-container mt-5" :style="{'background-color': reversed || !doneVoting ? '' : 'green'}" v-if="texts[0]">
                    <h1 class="title"> "{{ texts[0] }}"</h1> 
                      <transition-group name="list-slide-right" class="voters">
                        <div v-for="(player, i) in votedLeft" :key="i" class="player-box m-5">
                            <h1 class="title is-3">{{ player }}</h1>
                        </div>
                      </transition-group>
                </div>

                <div class="vote-container mt-5" :style="{'background-color': !reversed || !doneVoting ? '' : 'green'}" v-if="texts[1]">
                    <h1 class="title"> "{{ texts[1] }}"</h1> 
                      <transition-group name="list-slide-right" class="voters">
                        <div v-for="(player, i) in votedRight" :key="i" class="player-box m-5">
                            <h1 class="title is-3">{{ player }}</h1>
                        </div>
                      </transition-group>
                </div>

                <br/>

                <h1 class="title info-text" v-if="allCorrect" style="color: darkgreen !important;">Wauw {{  minigame.extraData.playerQueue[0] }}, iedereen heeft jouw tekst herkend! Goed bezig, geen geld naar die vuile imitator</h1>
                <h1 class="title info-text" v-if="!allCorrect && doneVoting && !noneCorrect" :style="{color: (success ? 'darkgreen' : 'darkred') + '!important'}"> {{ success ? 
                    'Meer dan de helft heeft op jouw tekst gestemd, ' + minigame.extraData.playerQueue[0] + '! Goed bezig :)' : 
                    'Helaas, die vervelende ' + minigame.extraData.imitatorQueue[0] + ' heeft je te goed geïmiteerd, en verdient geld voor zijn team :(' }}</h1>
                <h1 class="title info-text" v-if="doneVoting && noneCorrect" style="color: darkred !important;">Man man, {{ minigame.extraData.imitatorQueue[0] }} heeft perfect geïmiteerd en bonusgeld verdiend... </h1>
             </div>
         </template>
         <template v-else>
             <h1 class="title">Iedereen is aan de beurt geweest!</h1>
         </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import sounds from '@/assets/sounds/loaded-sounds';

export default Vue.extend({
    computed: {
        ...mapGetters(['minigame']),
        texts () {
            if (this.minigame.extraData.playerText.length === 0 || this.minigame.extraData.imitatorText.length === 0) {
                return [];
            }
            return !this.reversed
            ? [this.minigame.extraData.playerText, this.minigame.extraData.imitatorText] 
            : [this.minigame.extraData.imitatorText, this.minigame.extraData.playerText];
        },
        reversed () {
            return this.minigame.extraData.isReversed;
        },
        votedLeft () {
            return this.minigame.extraData.votes.filter((v: any) => !v.voteRight).map((v: any) => v.playerId);
        },
        votedRight () {
             return this.minigame.extraData.votes.filter((v: any) => v.voteRight).map((v: any) => v.playerId);
        },
        doneVoting () {
            return this.minigame.extraData.votes.length === this.minigame.extraData.numberOfPlayers - 2;
        },
        success () {
            return this.minigame.extraData.votes.filter((v: any) => this.reversed ? v.voteRight : !v.voteRight).
         length > (this.minigame.extraData.numberOfPlayers - 2) / 2 
        },
        allCorrect () {
            return this.doneVoting && 
            this.minigame.extraData.votes.
            filter((v: any) => this.reversed ? v.voteRight : !v.voteRight).length === this.minigame.extraData.numberOfPlayers - 2;
        },
        noneCorrect () {
            return this.doneVoting && 
            this.minigame.extraData.votes.
            filter((v: any) => this.reversed ? v.voteRight : !v.voteRight).length === 0;
        }
    },
    watch: {
        votedLeft (newValue, oldValue) {
            if (newValue?.length > oldValue?.length) {
                sounds.woosh.play();
            }
        },
        votedRight(newValue, oldValue) {
            if (newValue?.length > oldValue?.length) {
                sounds.woosh.play();
            }
        },
        success(newValue) {
            if (newValue && this.doneVoting) {
                sounds.correct.play();
            }
        },
        doneVoting (newValue) {
            if (newValue && !this.success) {
                sounds.fail.play();
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.vote-container {
    display: flex;
    padding: 3rem;
    border-radius: 124px;
    background-color: black;
    .title {
        max-width: 20vw;
    }
}

.info-text {
    background-color: white;
    padding: 1.5rem;
}

.player-box {
    background-color: #0c73d3;
    border-radius: 86px;
    padding: 1rem;
    height: fit-content;
}

.voters {
    display: flex;
    flex-wrap: wrap;
}
</style>