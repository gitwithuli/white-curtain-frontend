<template>
  <div>
    <div class="text-center">
      <h1 class="mt-3 mb-5">Movies</h1>
    </div>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 v-for="movie in movies" :key="movie.title">
        <v-card max-width="344" class="mx-auto mb-5">
          <v-list-item class="movie">
            <v-list-item-content>
              <v-list-item-title class="headline">{{ movie.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ movie.genre }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img :src="movie.poster" height="300" />

          <v-card-text v-if="movie.description<100">{{ movie.description }}</v-card-text>
          <v-card-text v-else>{{ movie.description.substring(0,100)+".." }}</v-card-text>

          <v-card-text v-if="movie.stars<40">{{ movie.stars }}</v-card-text>
          <v-card-text v-else>{{ movie.stars.substring(0,50)+".." }}</v-card-text>

          <v-card-text>Follow any of the following:</v-card-text>
          <v-card-actions>
            <v-btn color="info">Movie</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info">Genre</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info">Stars</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
// import MovieCards from "../components/MovieCards";
export default {
  data() {
    return {
      movies: [
        {
          title: "Pulp Fiction",
          genre: "Crime",
          stars: "Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta",
          poster:
            "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          description:
            "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        },
        {
          title: "The Shawshank Redemption",
          genre: "Crime",
          stars: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
          description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        },
        {
          title: "Forrest Gump",
          genre: "Drama",
          stars: "Tom Hanks, Rebecca Williams, Sally Field, Michael Conner Humphreys",
          poster:
            "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          description:
            "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        },
      ],
    };
  },
};
</script>

<style>
.movie {
  background-color: #f44336;
}
</style>