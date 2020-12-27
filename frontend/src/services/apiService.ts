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
    
    async getGameState() {
        return axios.get('/api/state');
    }

    async broadcastGamestate(newGamestate: GameState) {
        await axios.post('/api/state', newGamestate);
        this.socket.emit('GAMESTATE_CHANGED', newGamestate);
    }
}