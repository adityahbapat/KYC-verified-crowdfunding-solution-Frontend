<template>
  <div>
    <v-card class="text-center mx-auto my-4" max-width="480" outlined>
      <v-btn color="#9c77e0" class="my-2" @click="submit"> Open Camera </v-btn>
      <v-card-text>Click on "Open Camera"</v-card-text>
      <v-card-text
        >Please look for appropriate lighting condition for better face
        detection</v-card-text
      >
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import store from '@/store/index.js';
import router from '@/router/index.js';

export default {
    // created(){
    //     router.push("/login");
    // },

  methods: {
    submit() {
      let form = {
        id: store.state.id,
        dirname: store.state.dirname,
      };
      console.log("verifyForm", form);
      axios
        .post(process.env.VUE_APP_ENV_BACKEND + "kycOpenCamera", form)
        .then(function (response) {
          console.log("dirname", store.state.dirname);
          console.log("id", store.state.id);
          console.log(response);
          router.push("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
