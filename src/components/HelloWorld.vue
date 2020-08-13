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
          <v-btn
            v-for="link in links"
            :key="`${link.label}-login-link`"
            color="error"
            height="50px"
            width="100px"
            rounded
            :to="link.url"
          >Login</v-btn>
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
    },
    links() {
      const baseLinks = [];
      if (this.isLoggedIn) {
        baseLinks.push({
          label: "Movies",
          url: "/movies"
        });
      } else {
        baseLinks.push(
          {
            label: "Login",
            url: "/login"
          }
      );
      return baseLinks;
      }
    },
  },
};
</script>
