<template>
  <v-app class="bg-blue-lighten-5">
    <Cabecalho />
    <v-main>
      <Home />
    </v-main>
    <AppFooter class="bg-blue-lighten-5"/>
  </v-app>
</template>

<script setup>
import Cabecalho from "././components/Cabecalho.vue";
import AppFooter from "././components/AppFooter.vue";
import Home from "./components/Home.vue";
</script>
