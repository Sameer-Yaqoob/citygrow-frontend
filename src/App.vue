<template>
  <v-app class="app">
    <v-main class="main">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, provide } from "vue";
import {db} from "./firebaseInit";


export default defineComponent({
  name: 'App',
  setup(){
    provide('db', db);
    return { db };
  }
});
</script>

<style scoped>
.main {
  position: relative;
  padding: 0px;
}
.app {
  z-index: 1000;
}
</style>
