import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

// state -> data
// getters -> functions that return the state
// mutations -> functions that change the state
// actions -> functions where the logggic is

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {},
    movies: []
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    movies: (state) => state.movies
  },
  mutations: {
    setAuthenticationStatus(state, payload) {
      state.isLoggedIn = payload
    },
    setMovies(state, payload) {
      state.movies = payload
    },
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    login: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Axios.post(`login`, payload).then(({ data, status }) => {
          const token = data.jwt

          Axios.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${token})`
            return config
          })

          // make call to /users/me
          Axios.get(`users/me`).then((response) => {
            console.log(response)
            const follows = response.data.data.data.map((follow) => {
              // const u = {
              //   ...follow.attributes
              // }
              // console.log(u)
              // return u
              console.log(follow);
            })
            commit('setUser', follows)
          })

          //  tell your app that the user is logged in
          commit('setAuthenticationStatus', true)
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

    logout: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit('setAuthenticationStatus', false)
        delete Axios.defaults.headers.common["Authorization"]
        resolve()
      })
    },

    getMovies: ({ commit }) => {
      return new Promise((resolve, reject) => {
        Axios.get(`movies`).then((response) => {
          const movies = response.data.data.map((movie) => {
            const m = {
              ...movie.attributes,
              id: movie.id,
              stars: "Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys",
              poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            }

            m.genre = response.data.included.find(rel => rel.type === 'genre').attributes

            return m
          })
          commit('setMovies', movies)

        })
      })
    },
    followMovie: ({ commit }, movieId) => {
      return new Promise((resolve, reject) => {
        Axios.post(`movies/${movieId}/follow`)
          .then((data) => {
            console.log(data)
          })
      })
    }

  },
  modules: {
  }
})
