<template>
    <div>
        <div v-if="minigame" class="minigame-overlay">
            <h1 class="title pt-5 game-title">{{ minigame.name }}</h1>
            <div class="scores">
                <div v-for="team in teamCount" :key="team" class="p-3">
                    <h1 class="title is-6 mb-2">{{teamName(team)}}</h1>
                    <h1 class="has-text-weight-bold">{{ teamScoreByTeamnumber(team) }}</h1>
                </div>
            </div>
            <raad-de-woorden-board v-if="gameState.viewName === 'Woordenspel'" class="minigame" />
            <quiz-board v-if="gameState.viewName === 'Quiz'" class="minigame" />
            <riser-board v-if="gameState.viewName === 'Riser'" class="minigame" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import RaadDeWoordenBoard from './boards/RaadDeWoordenBoard.vue';
import QuizBoard from './boards/QuizBoard.vue';
import RiserBoard from './boards/RiserBoard.vue';

export default Vue.extend({
    components: { 
        RaadDeWoordenBoard,
        QuizBoard,
        RiserBoard
    },
    computed: {
        ...mapGetters(['gameState', 'minigame', 'teamScoreByTeamnumber', 'teamCount', 'teamName'])
    }
});
</script>

<style lang="scss" scoped>

.minigame-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    
    .scores {
        display: flex;
        align-self: center;
        background: black;
        border-radius: 86px;
        padding: 8px;
    }
}

.minigame {
    flex-grow: 1;
    padding-top: 24px;
}
</style>