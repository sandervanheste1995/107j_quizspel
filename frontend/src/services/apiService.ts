import config from '@/config';
import mutations from '@/store/mutations';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Store } from 'vuex';

export default class ApiService {
    store: Store<any> | undefined = undefined;
    socket: any;

    startSocket() {
        console.log('connecting to ' + config.backendUrl);
        this.socket = io(config.backendUrl);
        this.socket.on('GAMESTATE_CHANGED', (newState: any) => {
            if (newState.reset) {
                this.store?.dispatch('resetClient');
            } else if(newState.viewName) {
                this.store?.commit(mutations.setGamestate, newState);
            }
        });
    }
    
    async setPlayer() {
        if (this.store?.state.name) {
            await axios.post('/api/setPlayer',{name: this.store.state.name, team: this.store.state.team });
        }
    }

    async setNumberOfTeams (numberOfTeams: number) {
        await axios.post('/api/setNumberOfTeams', { numberOfTeams });
    }

    async getGameState() {
        return axios.get('/api/state');
    }

    async reset() {
        await axios.post('api/reset');
    }

    async getMinigames() {
        const res = await axios.get('/api/minigames');
        return res.status === 200 ? res.data : [];
    }

    async laadMinigame(id: number) {
        await axios.post('/api/minigames', { id });
    }

    async startPauzeMinigame() {
        await axios.post('api/minigame/toggle');
    }

    async stopMinigame() {
        await axios.post('api/minigame/stop');
    }

    // Woorden minigame
    async tryWord(word: string, name: string) {
        const res = await axios.post('/api/woordenspel/try', { word, name });

        if(res.status === 200) {
            return res.data;
        }
        return {success: false, message: 'Fout bij het checken'};
    }

    // Quiz minigame
    async quizSchermDelta(delta: number) {
        await axios.post('api/quiz/schermDelta', { delta });
    }

    async quizAnswer(answer: number | string, name: string) {
        const res = await axios.post('/api/quiz/answer', { answer, name });

        if(res.status === 200) {
            return res.data;
        }

        return {success: false, message: 'Fout bij het checken'};
    }

    async getQuizAnswer() {
        const res = await axios.get('/api/quiz/answer');

        if(res.status === 200) {
            return res.data;
        }

        return undefined;
    }

    // Riser minigame
    async riserClaim(team: number, name: string) {
        await axios.post('/api/riser/claim', { team, name });
    }

    // Guesser minigame
    async guesserVote(team: number, name: string, voteRight: boolean) {
        await axios.post('/api/guesser/vote', { team, name, voteRight });
    }
    async guesserSendText(name: string, message: string) {
        await axios.post('/api/guesser/setText', { name, message });
    }
    async guesserNextPlayer() {
        await axios.post('/api/guesser/nextPlayer');
    }
}