<template>
  <v-app class="bg-custom">
    <Cabecalho />
    <v-main>
      <Home />
    </v-main>
    <AppFooter class="bg-custom"/>
  </v-app>
</template>

<script setup>
import Cabecalho from "././components/Cabecalho.vue";
import AppFooter from "././components/AppFooter.vue";
import Home from "./components/Home.vue";
</script>

<style scoped>
.bg-custom {
  background-color: #17181A;
}
</style>