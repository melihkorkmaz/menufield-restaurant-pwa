<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Menufield</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="email" name="email" label="E-Mail" type="email" v-model="email"></v-text-field>
              <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Sign In</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: ""
  })
};
</script>
