<template>
  <div>
    <div class="text-center">
      <h1 class="mt-3 mb-5">{{movie.title}}</h1>
    </div>
    <v-layout row wrap>
      <v-flex xs12 md12 lg4>
        <v-card max-width="344" class="mx-auto mb-5">
          <v-list-item class="movie">
            <v-list-item-content>
              <v-list-item-title class="headline">{{ movie.title }}</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img :src="movie.poster" height="300" />

          <v-card-text>
            <ul>
              <li>{{ movie.genre.name }}</li>
              <li v-for="star in movie.stars" :key="star.name">{{star.name}} </li>
            </ul>
          </v-card-text>

          <v-card-actions v-if="user && user.followedGenres">
            <v-btn
              v-if="user.followedGenres.has(genre.id)"
              color="info"
              @click="unfollowGenre(genre.id)"
            >Unfollow {{ movie.genre.name }}</v-btn>
            <v-btn v-else color="info" @click="followGenre(genre.id)">Follow {{ movie.genre.name }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: {},
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  async created() {
    const movie = await this.$store.dispatch(
      "getMovie",
      this.$route.params.movieId
    );
    this.movie = movie;
  },
  methods: {
    followStar(id) {
      this.$store.dispatch("followStar", id);
    },
    unfollowStar(id) {
      this.$store.dispatch("unfollowStar", id);
    },
    followGenre(id) {
      this.$store.dispatch("followGenre", id);
    },
    unfollowGenre(id) {
      this.$store.dispatch("unfollowGenre", id);
    },
  },
};
</script>

<style>
.movie {
  background-color: #f44336;
}
</style>