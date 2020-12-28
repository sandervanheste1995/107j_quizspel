<template>
    <div class="content-wrapper">
        <div v-for="team in teamCount" :key="team">
            <p class="has-text-weight-bold pt-3">Team {{team}}</p>
            <transition-group name="list-slide">
                <p class="has-text-weight-bold pt-1 word" 
                v-for="word in teamWords(team)" 
                :key="word.word"><span>{{word.playerId}}</span> - {{word.word}}</p>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import sounds from '@/assets/sounds/loaded-sounds';

export default Vue.extend({
    computed: {
        ...mapGetters(['minigame', 'teamNumberByPlayerId', 'teamCount']),
        doneWords (): {playerId: string; word: string}[] {
            return this.minigame?.extraData?.doneWords || [];
        }
    },
    methods: {
        teamWords(team: number) {
            return this.doneWords.filter(w => this.teamNumberByPlayerId(w.playerId) === team);
        }
    },
    watch: {
        doneWords (newValue, oldValue) {
            if (newValue?.length > oldValue?.length) {
                sounds.woosh.play();
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.content-wrapper {
    display: flex;
    > div {
        border-left: 4px solid black;
        border-top: 4px solid black;
        flex-grow: 1;
    }
}

.word {
    color: $ternary;
    > span {
        color: $ternary;
    }
}
</style>