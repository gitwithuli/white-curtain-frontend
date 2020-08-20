<template>
  <!-- Login Module -->
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1 class="display-1 mb-5">Sign up</h1>
    </v-card-title>
    <v-card-text>
      <v-form v-model="isFormValid">
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          v-model="email"
          :rules="emailRules"
          required
        />

        <v-text-field
          ref="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          :rules="passwordRules"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = 
            !showPassword"
        />

        <v-text-field
          v-validate="'required|confirmed:password'"
          v-model="password_confirmation"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password Confirmation"
          prepend-icon="mdi-lock"
          @click:append="showPassword = 
            !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-signup-link`"
        color="primary"
        :to="link.url"
      >Already have an account?</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="success" :disabled="!isFormValid" @click.prevent="signUp()">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      showPassword: false,
      isFormValid: false,
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
      passwordRules: [
        (value) => !!value || "Required.",
        (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        }
      ]
    };
  },

  methods: {
    signUp() {
      this.$store
        .dispatch("signUp", {
          user: {
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          },
        })
        .then((success) => {
          this.$router.push("/login");
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Signed up successfully.",
            text: "Please login to start your White Curtain journey.",
          });
          
        })
        .catch((error) => {
          this.error = true;
        });
    },
  },

  
};

</script>