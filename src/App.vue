<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="red" dark>
        <v-toolbar-title>White Curtain</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-for="link in links"
          :key="`${link.label}-header-link`"
          text
          rounded
          :to="link.url"
        >{{ link.label }}</v-btn>
        <div class="buttons" v-if="isLoggedIn">
          <v-btn color="success" @click.prevent="getRecommendations()" @click="$router.push('/recommendations')">Recommendations</v-btn>
          <v-btn @click.prevent="logout()" @click="$router.push('/')">Logout</v-btn>
        </div>
      </v-app-bar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    links() {
      const baseLinks = [
        {
          label: "Home",
          url: "/",
        },
      ];
      if (this.isLoggedIn) {
        baseLinks.push({
          label: "Movies",
          url: "/movies",
        });
      } else {
        baseLinks.push(
          {
            label: "Login",
            url: "/login",
          },
          {
            label: "Signup",
            url: "/signup",
          }
        );
      }
      return baseLinks;
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then((success) => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Logged out successfully.",
            text: "See you later.",
          });
        })
        .catch((error) => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Could not logged out.",
          });
          this.error = true;
        });
    },
  },

  //  watch: {
  //   logout() {
  //       this.$router.replace('/')
  //   }
  // }
};
</script>