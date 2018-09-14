<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Menufield</v-toolbar-title>
          </v-toolbar>
          <v-form v-on:submit.prevent="signIn">
          <v-card-text>
            
              <v-text-field prepend-icon="email" name="email" label="E-Mail" type="email" v-model="email"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit" v-bind:disabled="btnText !== 'Sign In'">{{btnText}}</v-btn>
          </v-card-actions>
           </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar" bottom="" v-bind:timeout="3000"
    >
      {{snackMessage}}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { post } from "../utils/http.provider";

export default {
  data: () => ({
    email: "",
    password: "",
    snackbar: false,
    snackMessage: "",
    btnText: "Sign In"
  }),
  methods: {
    ...mapActions("user", ["initUserData"]),
    signIn() {
      const { email, password } = this;
      this.btnText = "Please wait...";
      if (email.length > 0 && password.length > 0) {
        post("/auth/sign-in")({
          email,
          password
        }).then(res => {
          this.btnText = "Sign In";
          if (!res.status) {
            this.snackMessage = res.message;
            this.snackbar = true;
            return;
          }
          this.initUserData({
            email,
            restaurantId: res.restaurantId
          });
          localStorage.setItem("mf-resId", res.restaurantId);
          localStorage.setItem("mf-email", email);
          localStorage.setItem("mf-auth", res.token);
          this.$router.push("/orders");
        });
      }
    }
  }
};
</script>
