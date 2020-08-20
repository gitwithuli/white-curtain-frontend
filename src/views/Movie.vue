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
            {{ movie.description }}
            <ul>
              <li class="font-weight-bold" v-for="star in movie.stars" :key="star.name">
                {{star.name}}
                <v-spacer></v-spacer>
                <v-btn
                  v-if="user.followedStars[star.id]"
                  color="warning"
                  @click="unfollowStar(star.id)"
                >Unfollow</v-btn>
                <v-btn v-else color="success" @click="followStar(star.id)">Follow</v-btn>
              </li>
            </ul>
          </v-card-text>

          <v-card-actions v-if="user && user.followedGenres">
            <v-btn
              v-if="user.followedGenres[movie.genre.id]"
              color="warning"
              @click="unfollowGenre(movie.genre.id)"
            >Unfollow {{ movie.genre.name }}</v-btn>
            <v-btn
              v-else
              color="info"
              @click="followGenre(movie.genre.id)"
            >Follow {{ movie.genre.name }}</v-btn>
          </v-card-actions>
        </v-card>
        <div class="back_button mb-5">
          <v-btn color="error" @click="$router.push(`/movies`)">Back to Movies</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" class="mt-5" @click="$router.push(`/recommendations`)">Back to Recommendations</v-btn>
        </div>
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
  async mounted() {
    const movie = await this.$store.dispatch(
      "getMovie",
      this.$route.params.movieId
    );
    this.movie = movie;
  },
  methods: {
    followStar(id) {
      this.$store.dispatch("followStar", id);
            this.$notify({
            group: "foo",
            type: "warn",
            title: "Successfull.",
            text: "Followed star.",
          });
    },
    unfollowStar(id) {
      this.$store.dispatch("unfollowStar", id);
            this.$notify({
            group: "foo",
            type: "warn",
            title: "Successfull.",
            text: "Unfollowed star.",
          });
    },
    followGenre(id) {
      this.$store.dispatch("followGenre", id);
            this.$notify({
            group: "foo",
            type: "warn",
            title: "Successfull.",
            text: "Followed genre.",
          });
    },
    unfollowGenre(id) {
      this.$store.dispatch("unfollowGenre", id);
            this.$notify({
            group: "foo",
            type: "warn",
            title: "Successfull.",
            text: "Unfollowed genre.",
          });
    },
  },
};
</script>

<style>
.movie {
  background-color: #f44336;
}
.back_button {
  text-align: center;
  margin-top: 50px;
}
</style>