<template>
  <Cabecalho />
  <Home />
</template>

<script setup>
import Cabecalho from '././components/Cabecalho.vue'
import AppFooter from '././components/AppFooter.vue'
import Home from './components/Home.vue'
import { fetchTasks } from '@/http/api.js'
</script>