import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.post(`login`, payload).then(({ data, status }) => {
          if (status === 200) {
            resolve(true);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    signUp: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.post(`users`, payload).then(({ data, status }) => {
          if (status === 200) {
            resolve(true);
          }
        }).catch(error => {
          reject(error)
        });
      });
    },
  },
  modules: {
  }
})
