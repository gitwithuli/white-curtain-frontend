<template>
  <div>
    <div class="text-center">
      <h1 class="mt-3 mb-5">Suggestions based on your follows</h1>
    </div>
    <v-layout row wrap v-if="recommendations.length">
      <v-flex xs12 md6 lg4 v-for="recommendation in recommendations" :key="recommendation.title">
        <v-hover v-slot:default="{ hover }" close-delay="150">
          <v-card :elevation="hover ? 16 : 2" max-width="344" class="mx-auto mb-5">
            <v-list-item class="movie">
              <v-list-item-content>
                <v-list-item-title class="headline">{{ recommendation.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-img
              :src="recommendation.poster"
              height="500"
              @click="$router.push(`/movies/${movie.id}`)"
            />

            <v-card-text v-if="recommendation.description<100">{{ recommendation.description }}</v-card-text>
            <v-card-text v-else>{{ recommendation.description.substring(0,100)+".." }}</v-card-text>

            <v-card-actions v-if="user">
              <v-btn
                v-if="user.followedMovies[recommendation.id]"
                color="warning"
                @click="unfollowMovie(recommendation.id)"
              >Unfollow</v-btn>
              <v-btn v-else color="info" @click="followMovie(recommendation.id)">Follow</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  computed: {
    recommendations() {
      return this.$store.getters.recommendations;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.$store.dispatch("getRecommendations");
  },
  methods: {
    followMovie(id) {
      this.$store.dispatch("followMovie", id);
    },
    unfollowMovie(id) {
      this.$store.dispatch("unfollowMovie", id);
    },
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
  }
};
</script>

<style>
.movie {
  background-color: #f44336;
}
</style>