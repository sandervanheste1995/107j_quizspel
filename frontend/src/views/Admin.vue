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
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
    data: () => ({
        minigames: [],
        selectedMinigame: 1
    }),
    computed: {
        ...mapGetters(['gameState'])
    },
    async created () {
        this.minigames = await this.$store.dispatch('getMinigames');
    },
    methods: {
        laadMinigame () {
            this.$store.dispatch('laadMinigame', this.selectedMinigame);
        },
        startPauzeMinigame () {
            this.$store.dispatch('startPauzeMinigame');
        },
        stopMinigame () {
            this.$store.dispatch('stopMinigame');
        }
    }
});
</script>

<style lang="scss" scoped>
.admin-content {
    background: white;
    border-radius: 20px;
}
</style>