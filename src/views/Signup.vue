<template>
  <!-- Login Module -->
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1 class="display-1 mb-5">Sign up</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          v-model="email"
          :rules="emailRules"
          required
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = 
            !showPassword"
        />
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          label="Password Confirmation"
          prepend-icon="mdi-lock"
          @click:append="showPassword = 
            !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-diveder></v-diveder>
    <v-card-actions>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-signup-link`"
        color="primary"
        :to="link.url"
      >Already have an account?</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      showPassword: false,
      links: [
        {
          label: "Login",
          url: "/login",
        },
      ],
      email: "",
      emailRules: [
        (value) => !!value || "Email is required",
        (value) =>
          !!value.indexOf("@") !== 0 || "Email should have a username.",
        (value) => value.includes("@") || "Email should include an @ symbol.",
        (value) =>
          value.indexOf(".") - value.indexOf("@") > 1 ||
          "Email should contain a valid domain.",
        (value) =>
          value.indexOf(".") <= value.length - 3 ||
          "Email should contain a valid domain.",
      ],
    };
  },
};
</script>