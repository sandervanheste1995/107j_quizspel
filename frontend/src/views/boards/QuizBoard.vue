<template>
    <div>
        <transition-group name="fade">
            <p class="text" v-html="!minigame.started ? '...' : text" key="text"></p>
            <template v-if="minigame.started && answer === undefined">
                <p class="subtext" v-if="subtext" v-html="subtext" key="subtext"></p>
                <div class="image-container" key="images">
                    <div v-for="(url, i) in images" :key="i" :style="{
                        'background-image': `url(${getImageUrl(url)})`,
                        width: (75/images.length) + 'vw',
                        height: (75/images.length) + 'vw'
                    }"/>
                </div>
                <div class="video-container" key="videos">
                    <video v-for="(url, i) in videos" 
                    class="p-4"
                    :key="i" :src="require('@/assets/videos/' + url)" controls>
                    </video>
                </div>

                <div class="audio-container" key="audio">
                    <audio v-for="(url, i) in sounds" 
                    class="p-4"
                    :key="i" :src="require('@/assets/sounds/' + url)" controls>
                    </audio>
                </div>
            </template>
            <h1 class="title answer" key="answer" v-if="answer">Het antwoord was: <br> {{ answer }}</h1>
        </transition-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
    data: () => ({
        answer: undefined
    }),
    async created () {
        if(this.allAnswered) {
            this.answer = await this.$store.dispatch('getQuizAnswer');
        }
    },
    computed: {
        ...mapGetters(['gameState', 'minigame']),
        text () {
            return this.minigame.extraData?.currentScreen?.text || '';
        },
        subtext () {
            return this.minigame.extraData?.currentScreen?.subtext || '';
        },
        images () {
            return this.minigame.extraData?.currentScreen?.images || [];
        },
        videos () {
            return this.minigame.extraData?.currentScreen?.videos || [];
        },
        sounds  () {
            return this.minigame.extraData?.currentScreen?.sounds || [];
        },
        allAnswered () {
            return this.minigame.extraData?.teamsAnswered[this.minigame.extraData?.screenIndex]?.length === 
                   this.gameState.teams.length
        }
    },
    methods: {
        getImageUrl(url: string) {
            // remote image
            if(url.toLowerCase().indexOf('http') !== -1) {
                return url;
            }
            // local image
            return require('@/assets/images/' + url);
        }
    },
    watch: {
        async allAnswered (newValue) {
            if(newValue) {
                this.answer = await this.$store.dispatch('getQuizAnswer');
            } else {
                this.answer = undefined;
            }
        }
    }
});
</script>

<style lang="scss" scoped>
.text {
    font-size: 46px !important;
}
.subtext {
    font-size: 30px !important;
    color: $ternary !important;
}

.image-container, .video-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > div, video {
       background-size: contain;
       background-repeat: no-repeat;
       margin: 1.5rem;
       max-width: 60vw;
       max-height: 60vh;
    }
}

.answer {
    color: $ternary !important;
}
</style>