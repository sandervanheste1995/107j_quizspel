<template>
    <div class="raad-woorden-content">

        <template v-if="!minigame.started">
            <h1 class="title">{{ minigame.name }}</h1>
            <p>{{ minigame.description }}</p>
        </template>
     
        <template v-else-if="!countdown">
            <h1 class="score title">Teamscore: {{ teamScore }}</h1>
            <h1 class="error title is-3" v-if="message">{{message}}</h1>
        </template>

        <template v-if="minigame.started && !countdown && !trying">
            <form method="post" @submit.prevent="tryWord">
                <b-field label="Voer hier in:">
                    <b-input v-model="word" ref="wordInput"></b-input>
                </b-field>
                <b-button :disabled="word.length === 0" 
                          native-type="submit"
                          type="is-black" rounded 
                          class="has-text-weight-bold">Probeer!
                </b-button>
            </form>
        </template>

        <stretch class="spinner" v-if="trying"></stretch>
        <h1 v-if="countdown" id="countdown" class="title">{{ countdown }}</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Stretch } from 'vue-loading-spinner';
import sounds from '@/assets/sounds/loaded-sounds';

export default Vue.extend({
    data: () => ({
        word: '',
        countdown: 0,
        trying: false,
        message: ''
    }),
    computed: {
        ...mapGetters(['minigame', 'teamScore'])
    },
    components: {
        Stretch
    },
    methods: {
        async tryWord () {
            if (this.trying) {
                return;
            }      
            this.trying = true;
            this.message = '';
            const result = await this.$store.dispatch('tryWord', this.word);

            if(result.success) {
                sounds.correct.play();
                this.message = '';
            } else {
                sounds.wrong.play();
                this.message = result.message;
            }
            this.word = '';
            this.trying = false;
            setTimeout(() => (this.$refs.wordInput as any)?.focus(), 33);
        }
    },
    watch: {
        minigame (newValue, oldValue) {
            if (newValue.started && !oldValue.started) {
                this.countdown = 4;
                const dec = () => {
                    this.countdown--;
                    if(this.countdown) {
                        setTimeout(dec, 1000);
                    }
                };
                dec();
            }
        }
    }
});
</script>

<style lang="scss">
#countdown {
    font-size: 80px;
    font-weight: bold;
}

.spinner {
    width: 250px !important;
    margin: 0 auto;
    * {
        background-color: $ternary !important;
    }
}

.score {
    text-transform: uppercase;
}
</style>