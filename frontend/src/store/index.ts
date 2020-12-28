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
    name: '',
    team: 0,
    gameState: {
      viewName: 'Home'
    }
  },
  getters: {
    gameState: state => state.gameState,
    minigame: state => state.gameState.minigameData,
    teamScore: state => {
      return state.gameState.minigameData?.scores.reduce((acc, s) => s.teamId === state.team ? acc + s.score : 0, 0);
    }
  },
  mutations: {
    [mutations.setGamestate] (state, newGameState: GameState) {
      state.gameState = newGameState;
    },
    [mutations.loadUser] (state) {
      state.name = localStorage.getItem('name') || '';
      state.team = parseInt(localStorage.getItem('team') || '');
    },
    [mutations.setUser] (state, { name, team }) {
      state.name = name;
      state.team = team;
      localStorage.setItem('name', state.name);
      localStorage.setItem('team', state.team.toString());
    }
  },
  actions: {
    async getGameState ({commit}) {
      const res = (await apiService.getGameState());

      if (res.status === 200) {
        commit(mutations.setGamestate, res.data);
      }
    },
    async getMinigames () {
      return await apiService.getMinigames();
    },
    async laadMinigame (_, minigameId: number) {
      await apiService.laadMinigame(minigameId);
    },
    async startPauzeMinigame () {
      await apiService.startPauzeMinigame();
    },
    async stopMinigame () {
      await apiService.stopMinigame();
    },
    broadcastGameState(_, gameState: GameState) {
        apiService.broadcastGamestate(gameState);
    },

    // Woordespel
    async tryWord({ state }, word: string) {
      return await apiService.tryWord(word, state.name, state.team);
    }
  }
};

const store = new Vuex.Store<StoreState>(storeObject);
apiService.store = store;
apiService.startSocket();

export default store;
