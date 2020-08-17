
<template>
  <!-- Login Module -->
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="Email" prepend-icon="mdi-email" />
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = 
            !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="primary" @click.prevent="login()">Login</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info">Forgot Password?</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-signup-link`"
        color="success"
        :to="link.url"
      >Signup</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      showPassword: false,
      links: [
        {
          label: "Signup",
          url: "/signup",
        },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  watch: {
    isLoggedIn(value) {
      if (value) {
        this.$router.replace('/movies')
      }
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          auth: {
            email: this.email,
            password: this.password,
          },
        })
        .then((success) => {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Logged in successfully.",
            text: "Welcome back to White Curtain.",
          });
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            group: "foo",
            type: "error",
            title: "Could not logged in.",
            text: "Please check your credentials.",
          });
          this.error = true;
        });
    },
  },
};
</script>
