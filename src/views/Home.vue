<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs12>
      <v-img src="https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg" contain></v-img>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aperiam recusandae accusamus, dicta ut ex quibusdam quis harum officia. Autem fuga, ullam aperiam recusandae architecto provident commodi quam minus iste.</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat depress outline color="teal">Order Now</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <p class="display-1">Contact Us</p>
        </v-card-title>
        <v-card-text>
          <p>No.(100)</p>
          <p>This Road. This Road and This Road</p>
          <p>This Township and this Town and this City</p>
          <p><strong>Email: fdatahfooddar@fds.com</strong></p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat depress outline color="success">
            <v-icon class="mr-3">phone</v-icon>911
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({})
};
</script>

<style scoped>
.flex {
  margin: 0 0 5px 0;
}
</style>

