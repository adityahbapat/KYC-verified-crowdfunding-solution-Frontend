<template>
  <v-container>
    <v-img
  lazy-src="https://brightdata.com/wp-content/uploads/2019/06/blog_kyc.png"
  max-height="400"
  max-width="100%"
  src="https://brightdata.com/wp-content/uploads/2019/06/blog_kyc.png"
></v-img>
    <v-card elevation="2">
      <form class="px-2 py-2" >
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
        <v-text-field
          v-model="city"
          :error-messages="cityErrors"
          label="City"
          required
          @input="$v.city.$touch()"
          @blur="$v.city.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="pincode"
          :error-messages="pincodeErrors"
          label="Pincode"
          required
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
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
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="show1 = !show1"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>

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
    city: { required },
    pincode: { required, maxLength: maxLength(6) },
    password: { required },
    aadhar: { required },
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
    city: "",
    pincode: "",
    password: "",
    show1: false,
    checkbox: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 6 || "Min 6 characters",
    },
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
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push("City is required.");
      return errors;
    },
    pincodeErrors() {
      const errors = [];
      if (!this.$v.pincode.$dirty) return errors;
      !this.$v.pincode.maxLength &&
        errors.push("Pincode must be 6 characters long");
      !this.$v.pincode.minLength &&
        errors.push("Pincode must be 6 characters long");
      !this.$v.pincode.required && errors.push("Pincode is required.");
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
      let data2 = {
        fname: this.firstName,
        lname: this.lastName,
        email: this.email,
        city: this.city,
        pincode: this.pincode,
        password: this.password,
      };
      let form = {
        document: this.aadhar,
        data2: data2,
      };
      console.log("formData:",form);

      axios.get(process.env.VUE_APP_ENV_BACKEND).then(function (response) {
        console.log(response);
      });
    },
    clear() {
      this.$v.$reset();
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.city = "";
      this.pincode = "";
      this.password = "";
      this.aadhar = null;
      this.select = null;
    },
  },
};
</script>
