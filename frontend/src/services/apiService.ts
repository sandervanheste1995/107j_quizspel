import config from '@/config';
import mutations from '@/store/mutations';
import { GameState } from '@shared/GameState';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Store } from 'vuex';

export default class ApiService {
    store: Store<any> | undefined = undefined;
    socket: any;

    startSocket() {
        console.log('connecting to ' + config.backendUrl);
        this.socket = io(config.backendUrl);
        this.socket.on('GAMESTATE_CHANGED', (newState: GameState) => {
            this.store?.commit(mutations.setGamestate, newState);
        });
    }
    
    async setPlayer() {
        if (this.store?.state.name) {
            await axios.post('/api/setPlayer',{name: this.store.state.name, team: this.store.state.team });
        }
    }

    async getGameState() {
        return axios.get('/api/state');
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
}