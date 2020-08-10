<template>
  <!-- Login Module -->
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Email" prepend-icon="mdi-email" />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = 
            !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-diveder></v-diveder>
    <v-card-actions>
      <v-btn color="primary">Login</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info">Forgot Password?</v-btn>
      <v-spacer></v-spacer>
      <v-btn
      v-for="link in links"
      :key="`${link.label}-signup-link`"
      color="success"
      :to="link.url"
      >
      Signup
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      showPassword: false,
      links: [
        {
        label: 'Signup',
        url: '/signup'
      }
      ]
    };
  },
};
</script>
