<template>
  <v-container>
    <v-row>
      <StatusTickets ref="statusTickets" />

      <v-col cols="5" class="ml-5 mr-n12">
        <ListagemTicketsDescritivo ref="listagemTicketsDescritivo" />
        <QuantidadesTicketsCards ref="quantidadesTicketsCards" />
      </v-col>

      <TotalTickets />
    </v-row>
  </v-container>
</template>

<script>
import QuantidadesTicketsCards from "./QuantidadesTicketsCards.vue";
import ListagemTicketsDescritivo from "./ListagemTicketsDescritivo.vue";
import StatusTickets from "./StatusTickets.vue";
import TotalTickets from "./TotalTickets.vue";

export default {
  data() {
    return {
      refreshInterval: null,
    };
  },
  async mounted() {
    await this.fetchData();
    this.startAutoRefresh();
  },
  methods: {
    async fetchData() {
      this.$refs.quantidadesTicketsCards.fetchData();
      this.$refs.listagemTicketsDescritivo.fetchData();
      this.$refs.statusTickets.fetchData();
    },
    startAutoRefresh() {
      this.refreshInterval = setInterval(this.fetchData, 60000);
    }
  }
};
</script>