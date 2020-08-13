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
          label: "Logout",
          url: "/logout",
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
      return baseLinks
    },
  },
};
</script>