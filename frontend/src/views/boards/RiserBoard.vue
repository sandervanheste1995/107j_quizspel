<template>
    <div>
        <h1 v-if="!started" class="title">Bereid jullie voor!</h1>
        <template v-if="started">
            <div class="background">
                <div :style="{
                    width: (minigame.extraData.currentAmount / minigame.extraData.maxAmount)*100 + '%',
                    }" />
            </div>
            <h1 class="title amount" :style="{
                transform: `scale(${0.5 + minigame.extraData.currentAmount / minigame.extraData.maxAmount / 2})`
                }">
                {{ minigame.extraData.currentAmount }}
            </h1>

            <h1 class="title" v-if="teamWon">
                Team {{ teamWon }} heeft gewonnen!
            </h1>
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
        started () {
            return this.minigame.started;
        },
        teamWon () {
            return this.minigame.extraData.teamWon;
        }
    },
    watch: {
        started (newValue) {
            if(newValue) {
                sounds.sletjes.play();
            }
        },
        teamWon (newValue) {
            if (newValue) {
                sounds.sletjes.stop();
                sounds.cash.play();
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.amount {
    font-size: 150pt;
    color: #e2c12e !important;
    transition: 0.25s;
}

.background {
    height: 20px;
    background-color: lightgray;
    border-radius: 12px;
    position: relative;
    width: 50%;
    margin: 0 auto;
    margin-top: 24px;
    > div {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: green;
        border-radius: 12px;
        transition: width 0.25s;
    }
}
</style>