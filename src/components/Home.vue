<template>
  <v-container class="bg-red">
    <v-row>
      <v-col cols="5" class="bg-blue">
        <v-row>
          <v-card
            class="mt-5 pr-4"
            variant="outlined"
            title="TICKETS ABERTOS NO MÊS"
          >
            <div
              class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black"
            >
              {{ quantidadeTicketsAbertosMes }}
            </div>
          </v-card>

          <v-card
            class="mt-5 ml-5 pr-3"
            variant="outlined"
            title="TICKETS ABERTOS NA SEMANA"
          >
            <div
              class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black"
            >
              {{ quantidadeTicketsAbertosSemana }}
            </div>
          </v-card>
        </v-row>

        <v-row>
          <v-card
            class="mt-5"
            variant="outlined"
            title="TICKETS FECHADOS NO MÊS"
          >
            <div
              class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black"
            >
              {{ quantidadeTicketsFechadosMes }}
            </div>
          </v-card>

          <v-card
            class="mt-5 ml-5"
            variant="outlined"
            title="TICKETS FECHADOS NA SEMANA"
          >
            <div
              class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black"
            >
              {{ quantidadeTicketsFechadosSemana }}
            </div>
          </v-card>
        </v-row>
      </v-col>

      <v-col cols="3" class="bg-green">
        <v-row>
          <v-card
            class="mt-5 ml-16"
            variant="outlined"
            title="STATUS DOS TICKETS"
          >
            <v-list>
              <v-list-item-group>
                <v-list-item
                  v-for="(count, status) in contarTicketsPorStatus"
                  :key="status"
                  class=""
                >
                  <!-- Bolinha de cor -->
                  <div
                    :style="{ backgroundColor: getColor(status) }"
                    class="status-bolinha mr-3"
                  ></div>
                  <div>
                    <!-- Nome do Status -->
                    <v-list-item-content>
                      <v-list-item-title class="bg-orange d-flex justify-start">{{ status }}</v-list-item-title>
                    </v-list-item-content>
                  </div>

                  <!-- Quantidade de Tickets -->
                  <v-list-item-content class="text-right">
                    <v-list-item-title>{{ count }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { QuantidadeTickets } from "@/scripts/QuantidadeTickets";

export default {
  data() {
    return {
      quantidadeTicketsAbertosMes: 0,
      quantidadeTicketsAbertosSemana: 0,
      quantidadeTicketsFechadosMes: 0,
      quantidadeTicketsFechadosSemana: 0,
      contarTicketsPorStatus: {},
    };
  },
  async mounted() {
    const analise = new QuantidadeTickets();

    try {
      this.quantidadeTicketsAbertosMes =
        await analise.quantidadeTicketsAbertosMes();
      this.quantidadeTicketsAbertosSemana =
        await analise.quantidadeTicketsAbertosSemana();
      this.quantidadeTicketsFechadosMes =
        await analise.quantidadeTicketsFechadosMes();
      this.quantidadeTicketsFechadosSemana =
        await analise.quantidadeTicketsFechadosSemana();
      this.contarTicketsPorStatus = await analise.contarTicketsPorStatus();
    } catch (error) {
      console.error("Erro ao buscar tarefa: ", error);
    }
  },
  methods: {
    getColor(status) {
      const colors = {
        "a fazer": "#f44336",
        "em desenvolvimento": "#ff9800",
        "publicado dev": "#4caf50",
        "publicado master": "#2196f3",
        "ag. publicação": "#9c27b0",
        "retornar cliente": "#e91e63",
        "ag. info": "#3f51b5",
        "negado dev": "#f44336",
        "reprovado qa": "#607d8b",
      };
      return colors[status] || "#ccc";
    },
  },
};
</script>

<style scoped>
.status-bolinha {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>