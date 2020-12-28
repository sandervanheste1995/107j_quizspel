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
      viewName: 'Home',
      teams: []
    }
  },
  getters: {
    gameState: state => state.gameState,
    minigame: state => state.gameState.minigameData,
    teamNumber: state => state.gameState.teams.findIndex(t => t.find(p => p === state.name)) + 1,
    teamNumberByPlayerId: state => (playerId: string) => state.gameState.teams.findIndex(t => t.find(p => p === playerId)) + 1,
    teamScore: (state, getters) => {
      return state.gameState.minigameData?.scores
      .reduce((acc, s) => getters.teamNumberByPlayerId(s.playerId) === state.team ? acc + s.score : 0, 0);
    },
    teamScoreByTeamnumber: (state, getters) => (team: number) => {
      return state.gameState.minigameData?.scores
      .reduce((acc, s) => getters.teamNumberByPlayerId(s.playerId) === team ? acc + s.score : 0, 0);
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
    async setPlayer () {
      await apiService.setPlayer();
    },
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

    // Woordespel
    async tryWord({ state }, word: string) {
      if (!word) {
        return;
      }
      return await apiService.tryWord(word, state.name);
    }
  }
};

const store = new Vuex.Store<StoreState>(storeObject);
apiService.store = store;
apiService.startSocket();

export default store;
