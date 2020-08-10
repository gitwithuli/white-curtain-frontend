<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="red" dark>
        <v-toolbar-title>White Curtain</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
        v-for = "link in links"
        :key="`${link.label}-header-link`"
        text 
        rounded 
        :to="link.url"
        >
          {{ link.label }}
        </v-btn>
      </v-app-bar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer color="primary lighten-1" padless>
        <v-layout justify-center wrap>
          <v-btn
            v-for="link in links"
            :key="`${link.label}-footer-link`"
            color="white"
            text
            rounded
            class="my-2"
            :to="link.url"
          >

          {{ link.label }}</v-btn>
          <v-flex primary lighten-2 py-4 text-center white--text xs12>
            {{ new Date().getFullYear() }} —
            <strong>White Curtain</strong>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      links: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Login',
          url: '/login'
        },
        {
          label: 'Signup',
          url: '/signup'
        }
      ]
    };
  },

};
</script>