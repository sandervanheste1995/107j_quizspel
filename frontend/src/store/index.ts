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
    teamName: state => (teamNumber: number) => {
      if(!teamNumber) {
        return undefined;
      }
      switch(teamNumber) {
        default:
         return 'Team ' + teamNumber;
      }
    },
    gameState: state => state.gameState,
    minigame: state => state.gameState.minigameData,
    teamNumber: (state, getters) => getters.teamNumberByPlayerId(state.name),
    teamNumberByPlayerId: state => (playerId: string) => state.gameState.teams.findIndex(t => t.find(p => p === playerId)) + 1,
    teamScore: (state, getters) => {
      return getters.teamScoreByTeamnumber(state.team);
    },
    myTeam: (state) => {
      return state.gameState.teams.find(t => t.indexOf(state.team.toString()) !== -1);
    },
    teamsEmpty: (state) => !state.gameState.teams?.filter(t => t.length > 0).length,
    teamCount: (state) => {
      return state.gameState.teams.length;
    },
    teamScoreByTeamnumber: (state, getters) => (team: number) => {
      let accScore = 0;
      state.gameState.minigameData?.scores.forEach(score => {
        if(getters.teamNumberByPlayerId(score.playerId) === team) {
          accScore += score.score;
        }
      });
      return accScore;
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
    async setNumberOfTeams(_, numberOfTeams: number) {
      await apiService.setNumberOfTeams(numberOfTeams);
    },
    async setPlayer () {
      await apiService.setPlayer();
    },
    async getGameState ({commit}) {
      const res = (await apiService.getGameState());

      if (res.status === 200) {
        commit(mutations.setGamestate, res.data);
      }
    },
    async reset () {
      await apiService.reset();
    },
    async resetClient () {
      localStorage.removeItem('name');
      localStorage.removeItem('team');
      window.location.reload();
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
    },

    // Quiz
    async quizSchermDelta(_, delta: number) {
      await apiService.quizSchermDelta(delta);
    },
    async quizAnswer({ state }, answer: number | string) {
      return await apiService.quizAnswer(answer, state.name);
    },
    async getQuizAnswer() {
      return await apiService.getQuizAnswer();
    },

    // Riser
    async riserClaim({ state }) {
      await apiService.riserClaim(state.team, state.name);
    },

    // Guesser
    async vote ({ state} , voteRight: boolean) {
      await apiService.guesserVote(state.team, state.name, voteRight);
    },
    async sendText( { state}, message: string) {
      await apiService.guesserSendText(state.name, message);
    },
    async guesserNextPlayer() {
      await apiService.guesserNextPlayer();
    }
  }
};

const store = new Vuex.Store<StoreState>(storeObject);
apiService.store = store;
apiService.startSocket();

export default store;
