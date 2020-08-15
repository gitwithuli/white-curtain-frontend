<template>
  <div>
    <div class="text-center">
      <h1 class="mt-3 mb-5">Top Rated Movies</h1>
    </div>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 v-for="movie in movies" :key="movie.title">
        <v-card max-width="344" class="mx-auto mb-5">
          <v-list-item class="movie">
            <v-list-item-content>
              <v-list-item-title class="headline">{{ movie.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ movie.genre.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img :src="movie.poster" height="300" @click="$router.push(`/movies/${movie.id}`)"/>

          <v-card-text v-if="movie.description<100">{{ movie.description }}</v-card-text>
          <v-card-text v-else>{{ movie.description.substring(0,100)+".." }}</v-card-text>

          <v-card-text v-if="movie.stars<40">{{ movie.stars }}</v-card-text>
          <v-card-text v-else>{{ movie.stars.substring(0,50)+".." }}</v-card-text>

          <v-card-actions v-if="user && user.followedMovies">
            <v-btn v-if="user.followedMovies.has(movie.id)" color="warning" @click="unfollowMovie(movie.id)">Unfollow</v-btn>
            <v-btn v-else color="info" @click="followMovie(movie.id)">Follow</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
// import MovieCards from "../components/MovieCards";
export default {  
  computed: {
    movies(){
      return this.$store.getters.movies
    },
    user() {
      return this.$store.getters.user
    },
  },
  created(){
    this.$store.dispatch("getMovies")
  },
  methods: {
    followMovie(id) {
      this.$store.dispatch('followMovie', id)
    },
    unfollowMovie(id) {
      this.$store.dispatch('unfollowMovie', id)
    }
  }
};
</script>

<style>
.movie {
  background-color: #f44336;
}
</style>