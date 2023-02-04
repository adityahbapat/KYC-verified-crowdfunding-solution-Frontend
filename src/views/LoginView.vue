<template>
  <v-app id="inspire">
    <v-card-actions class="clr">
      <v-col>
        <router-link style="text-decoration: none; color: inherit" to="/">
          <v-btn text>Secure Patrons</v-btn></router-link
        >
      </v-col>
      <v-col class="text-right">
        <router-link
          style="text-decoration: none; color: inherit"
          to="/crowdfunding"
        >
          <v-btn class="mx-1">Crowdfunding</v-btn></router-link
        >
        <router-link style="text-decoration: none; color: inherit" to="/">
          <v-btn
            style="cursor: pointer"
            color="blue-grey"
            class="ma-2 white--text"
          >
            Signup
          </v-btn>
        </router-link>
      </v-col>
    </v-card-actions>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="#9c77e0">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#9c77e0" @click="submit()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import router from '@/router/index.js';

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),

  methods: {
    submit(){
        let formData = {"email": this.email, "password": this.password};
        console.log(formData);
        axios
        .post(process.env.VUE_APP_ENV_BACKEND + "login", formData)
        .then(function (response) {
          console.log(response);
          window.localStorage.setItem('token', response.data.token);
          router.push("/crowdfunding");
        })
        .catch(function (error) {
            this.email = ""
            this.password = ""
            window.localStorage.setItem('token', null);
          console.log(error);
        });


    }
  }
};
</script>

<style></style>
