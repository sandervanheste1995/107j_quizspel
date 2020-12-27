import ApiService from '@/services/apiService';
import { GameState } from '@shared/GameState';
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import mutations from './mutations';
import { StoreState } from './store-model';

Vue.use(Vuex)

const apiService = new ApiService();

const storeObject: StoreOptions<StoreState> = {
  strict: true,
  state: {
    gameState: {
      viewName: 'Home'
    }
  },
  getters: {
    gameState: state => state.gameState
  },
  mutations: {
    [mutations.setGamestate] (state, newGameState: GameState) {
      state.gameState = newGameState;
    }
  },
  actions: {
    async getGameState ({commit}) {
      const res = (await apiService.getGameState());

      if (res.status === 200) {
        commit(mutations.setGamestate, res.data);
      }
    },
    broadcastGameState(_, gameState: GameState) {
        apiService.broadcastGamestate(gameState);
    }
  }
};

const store = new Vuex.Store<StoreState>(storeObject);
apiService.store = store;
apiService.startSocket();

export default store;
