<template>
    <div style="width: 100%;">
        <h1 class="score title">Teamscore: {{ teamScore }}</h1>

        <h1 class="title" style="color:darkred" v-if="message">{{message}}</h1>

        <template v-if="!minigame.started">
            <h1 class="title">{{ minigame.name }}</h1>
            <p>{{ minigame.description }}</p>
        </template>

        <stretch class="spinner" v-else-if="pending"></stretch>

        <template v-else-if="currentScreen.type === 'info'">
            <h1 class="title">...</h1>
        </template>

         <div v-else-if="currentScreen.type === 'multiplechoice'" class="multiple-choice-wrapper">
            <div v-for="(answer,i) in currentScreen.answers" :key="i" class="multiple-choice">
                <b-button class="title is-4" type="is-info" rounded @click="() => confirmChoice(i)" :disabled="(confirmedAnswer || submitted) && i !== teamAnswer">
                    <span :style="{position: 'relative', top: submitted || confirmedAnswer ? '-5px' : 0}">{{answer}}</span>
                    <b-icon
                        v-if="teamAnswer === i && (submitted || confirmedAnswer)"
                        pack="fas"
                        :icon="teamSuccess ? 'check-circle' : 'times-circle'"
                        :style="{color: teamSuccess ? 'darkgreen' : 'darkred'}"
                        size="is-medium">
                    </b-icon>
                </b-button>
            </div>
        </div>

        <template v-else-if="currentScreen.type === 'open'">
            <b-icon
                v-if="submitted || confirmedAnswer"
                pack="fas"
                :icon="teamSuccess ? 'check-circle' : 'times-circle'"
                :style="{color: teamSuccess ? 'darkgreen' : 'darkred'}"
                size="is-large">
            </b-icon>
            <b-input v-model="teamAnswer" class="mb-5" :disabled="confirmedAnswer || submitted"></b-input>
            <b-button class="title" type="is-info" rounded @click="confirmAnswer" :disabled="confirmedAnswer || submitted || teamAnswer.length === 0">Bevestig</b-button>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Stretch } from 'vue-loading-spinner';
import sounds from '@/assets/sounds/loaded-sounds';

export default Vue.extend({
    components: {
        Stretch
    },
    data: () => ({
        pending: false,
        answer: '',
        answerIndex: -1,
        submitted: false,
        success: false,
        message: ''
    }),
    computed: {
        ...mapGetters(['minigame', 'teamScore', 'teamNumberByPlayerId']),
        currentScreen (): any {
            return this.minigame.extraData?.currentScreen || { };
        },
        confirmedAnswer(): any {
            return this.minigame?.extraData?.teamsAnswered[this.minigame?.extraData?.screenIndex]?.
            find((t: any) => t.teamNumber === this.$store.state.team);
        },
        teamAnswer: {
            get: function(): string | number {
                if (this.confirmedAnswer === undefined) {
                    return (this.currentScreen as any).type === 'open' ? this.answer : this.answerIndex;
                }
                return (this.confirmedAnswer as any).answer as string | number;
            },
            set: function(newAnswer: string) {
                this.answer = newAnswer;
            }
        },
        teamSuccess () {
            if(this.confirmedAnswer) {
                return this.minigame?.scores.slice().reverse().
                find((s: any) => this.teamNumberByPlayerId(s.playerId) === this.$store.state.team)?.score > 0;
            }
            return this.success;
        }
    },
    methods: {
        async confirmChoice (index: number) {
            if (this.confirmedAnswer || this.submitted) {
                return;
            }

            this.pending = true;
            this.answerIndex = index;

            const result = await this.$store.dispatch('quizAnswer', index);

            if(result?.success) {
                sounds.correct.play();
            } else {
                sounds.wrong.play();
                this.message = result?.message;
            }

            this.submitted = true;
            this.pending = false;
            this.success = result?.success;
        },
        async confirmAnswer () {
            if (this.confirmedAnswer || this.submitted) {
                return;
            }

            this.pending = true;
            const result = await this.$store.dispatch('quizAnswer', this.answer);

            if(result?.success) {
                sounds.correct.play();
            } else {
                sounds.wrong.play();
                this.message = result?.message;
            }

            this.submitted = true;
            this.pending = false;
            this.success = result?.success;
        }
    },
    watch: {
        currentScreen () {
            this.submitted = false;
        }
    }
});
</script>

<style lang="scss" scoped>
.multiple-choice {
    padding: 0.5rem;
    margin: 0.4rem;
}

.multiple-choice-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.score {
    text-transform: uppercase;
}
</style>