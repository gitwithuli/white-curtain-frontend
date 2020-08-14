<template>
  <div>
    <v-layout row wrap v-if="movie">
      <v-flex 12>
        <v-card max-width="344" class="mx-auto mb-5 mt-5">
          <v-list-item class="movie">
            <v-list-item-content>
              <v-list-item-title class="headline text-center">{{ movie.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ movie.genre.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img :src="movie.poster" height="300" />

          <v-card-text>
            <ul>
              <li v-for="star in movie.stars" :key="star.name">
                  {{star.name}}
                  <v-btn v-if="user.followedStars.has(star.id)" color="info" @click="unfollowStar(star.id)">Unfollow </v-btn>
                    <v-btn v-else color="info" @click="followStar(star.id)">Follow </v-btn> 
                </li>
            </ul>
          </v-card-text>

          <v-card-actions v-if="user && user.followedGenres">
            <v-btn v-if="user.followedGenres.has(movie.genre.id)" color="info" @click="unfollowGenre(movie.genre.id)">Unfollow {{ movie.genre.name }} </v-btn>
            <v-btn v-else color="info" @click="followGenre(movie.genre.id)">Follow  {{ movie.genre.name }} </v-btn>
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
      movie: null,
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