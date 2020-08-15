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
    movies: [],
    recommendations: {}
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    movies: (state) => state.movies,
    user: (state) => state.user
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
            const user = {
              ...response.data.data.attributes,
              id: response.data.data.id,

            }
            user.followedMovies = new Set()
            response.data.data.relationships.followed_movies.data.forEach((rel) => user.followedMovies.add(rel.id))

            user.followedGenres = new Set()
            response.data.data.relationships.followed_genres.data.forEach((rel) => user.followedGenres.add(rel.id))

            user.followedStars = new Set()
            response.data.data.relationships.followed_stars.data.forEach((rel) => user.followedStars.add(rel.id))

            commit('setUser', user)

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
              poster: `http://image.tmdb.org/t/p/w500${movie.attributes.poster}`,
              id: movie.id,
              stars: "Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys",
            }

            m.genre = response.data.included.find(rel => rel.type === 'genre').attributes

            return m
          })
          commit('setMovies', movies)

        })
      })
    },
    getMovie: ({ commit }, movieId) => {
      return new Promise((resolve, reject) => {
        Axios.get(`movies/${movieId}`).then((response) => {
          const movie = {
            ...response.data.data.attributes,
            id: response.data.data.id,
            stars: "Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys",
            poster: `http://image.tmdb.org/t/p/w500${response.data.data.attributes.poster}`,
          }

          const genre = response.data.included.find(rel => rel.type === 'genre')
          movie.genre = {
            ...genre.attributes,
            id: genre.id
          }
          movie.stars = response.data.included.filter(rel => rel.type === 'star').map(rel => ({ 
            ...rel.attributes,
            id: rel.id,
          }))

          resolve(movie)
        })
      })
    },
    followMovie: ({ commit, state }, movieId) => {
      return new Promise((resolve, reject) => {
        Axios.post(`movies/${movieId}/follow`)
          .then((response) => {
            const user = state.user
            user.followedMovies = new Set()
            response.data.data.forEach((rel) => user.followedMovies.add(rel.id))
            commit('setUser', user)
          })
      })
    },
    unfollowMovie: ({ commit, state }, movieId) => {
      return new Promise((resolve, reject) => {
        Axios.delete(`movies/${movieId}/unfollow`)
          .then((response) => {
            const user = state.user
            user.followedMovies = new Set()
            response.data.data.forEach((rel) => user.followedMovies.add(rel.id))
            commit('setUser', user)
          })
      })
    },
    followStar: ({ commit, state }, starId) => {
      return new Promise((resolve, reject) => {
        Axios.post(`stars/${starId}/follow`)
          .then((response) => {
            const user = state.user
            user.followedStars = new Set()
            response.data.data.forEach((rel) => user.followedStars.add(rel.id))
            commit('setUser', user)
          })
      })
    },
    unfollowStar: ({ commit, state }, starId) => {
      return new Promise((resolve, reject) => {
        Axios.delete(`stars/${starId}/unfollow`)
          .then((response) => {
            const user = state.user
            user.followedStars = new Set()
            response.data.data.forEach((rel) => user.followedStars.add(rel.id))
            commit('setUser', user)
          })
      })
    },
    followGenre: ({ commit, state }, genreId) => {
      return new Promise((resolve, reject) => {
        Axios.post(`genres/${genreId}/follow`)
          .then((response) => {
            const user = state.user
            user.followedGenres = new Set()
            response.data.data.forEach((rel) => user.followedGenres.add(rel.id))
            commit('setUser', user)
          })
      })
    },
    unfollowGenre: ({ commit, state }, genreId) => {
      return new Promise((resolve, reject) => {
        Axios.delete(`genres/${genreId}/unfollow`)
          .then((response) => {
            const user = state.user
            user.followedGenres = new Set()
            response.data.data.forEach((rel) => user.followedGenres.add(rel.id))
            commit('setUser', user)
          })
      })
    }


  },
  modules: {
  }
})
