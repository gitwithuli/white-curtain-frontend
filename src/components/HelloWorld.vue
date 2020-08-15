<template>
  <v-parallax height="800" :src="require('../assets/white-curtain.jpg')">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/logo.png')"
            class="mb-5"
            color="rgb(255, 0, 0, 0.2)"
            contain
            height="200"
          />
        </v-col>

        <v-col class="mb-5">
          <h1 class="display-2 font-weight-bold mb-5">Welcome to White Curtain</h1>
          <v-btn v-if="isLoggedIn" color="error" height="50px" width="100px" rounded @click="$router.push(`/movies`)">Movies</v-btn>
          <v-btn v-else color="error" height="50px" width="100px" rounded @click="$router.push(`/login`)">Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  name: "HelloWorld",

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
};
</script>
