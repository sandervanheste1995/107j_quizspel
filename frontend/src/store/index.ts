import ApiService from '@/services/apiService';
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';

Vue.use(Vuex)

const apiService = new ApiService();

export default new Vuex.Store({
  strict: true,
  state: {
    message: ''
  },
  mutations: {
    [mutations.setMessage] (state, message) {
      state.message = message;
    }
  },
  actions: {
    async getMessage({ commit }) {
      commit(mutations.setMessage, (await apiService.getMessage()).data.message);
    }
  }
})
