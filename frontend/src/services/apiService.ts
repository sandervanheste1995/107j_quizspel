import mutations from '@/store/mutations';
import { GameState } from '@shared/GameState';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Store } from 'vuex';

export default class ApiService {
    store: Store<any> | undefined = undefined;
    socket: any;

    startSocket() {
        this.socket = io('http://localhost:8080');
        this.socket.on('GAMESTATE', (newState: GameState) => {
            this.store?.commit(mutations.setGamestate, newState);
        });
    }
    
    async getGameState() {
        return axios.get('/api/state');
    }

    broadcastGamestate(newGamestate: GameState) {
        this.socket.emit('SET_GAMESTATE', newGamestate);
    }
}