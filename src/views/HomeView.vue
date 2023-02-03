<template>
  <v-container>
    <v-card elevation="2">
      <form class="pa-md-4 mx-lg-auto">
        <v-text-field
          v-model="firstName"
          :error-messages="firstNameErrors"
          :counter="10"
          label="First Name"
          required
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :error-messages="lastNameErrors"
          :counter="10"
          label="Last Name"
          required
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-file-input
          v-model="aadhar"
          label="Aadhar Card Image"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          show-size
          truncate-length="15"
        ></v-file-input>

        <v-btn class="mr-4" @click="submit"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    aadhar: null,
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First Name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    submit() {
      let verificationData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        aadhar: this.aadhar,
      };
      console.log(verificationData);
      
      axios.get(process.env.VUE_APP_ENV_BACKEND).then(function (response) {
        console.log(response);
      });
    },
    clear() {
      this.$v.$reset();
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.aadhar = null;
      this.select = null;
    },
  },
};
</script>
