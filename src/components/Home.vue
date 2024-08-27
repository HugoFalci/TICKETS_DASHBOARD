<template>
  <v-container>
    <v-row>
      <v-card class="mt-5 pr-4" variant="outlined" title="TICKETS ABERTOS NO MÊS">
        <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
          {{ quantidadeTicketsAbertosMes }}
        </div>
      </v-card>

      <v-card class="mt-5 ml-5 pr-3" variant="outlined" title="TICKETS ABERTOS NA SEMANA">
        <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
          {{ quantidadeTicketsAbertosSemana }}
        </div>
      </v-card>
    </v-row>

    <v-card>
      {{ contarTicketsPorStatus }}
    </v-card>

    <v-row>
      <v-card class="mt-5" variant="outlined" title="TICKETS FECHADOS NO MÊS">
        <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
          {{ quantidadeTicketsFechadosMes }}
        </div>
      </v-card>

      <v-card class="mt-5 ml-5" variant="outlined" title="TICKETS FECHADOS NA SEMANA">
        <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
          {{ quantidadeTicketsFechadosSemana }}
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { QuantidadeTickets } from '@/scripts/QuantidadeTickets';

export default {
  data() {
    return {
      quantidadeTicketsAbertosMes: 0,
      quantidadeTicketsAbertosSemana: 0,
      quantidadeTicketsFechadosMes: 0,
      quantidadeTicketsFechadosSemana: 0,
      contarTicketsPorStatus: {}
    };
  },
  async mounted() {
    const analise = new QuantidadeTickets();

    try {
      this.quantidadeTicketsAbertosMes = await analise.quantidadeTicketsAbertosMes();
      this.quantidadeTicketsAbertosSemana = await analise.quantidadeTicketsAbertosSemana();
      this.quantidadeTicketsFechadosMes = await analise.quantidadeTicketsFechadosMes();
      this.quantidadeTicketsFechadosSemana = await analise.quantidadeTicketsFechadosSemana();
      this.contarTicketsPorStatus = await analise.contarTicketsPorStatus()
    } catch (error) {
      console.error('Erro ao buscar tarefa: ', error);
    }
  }
}
</script>