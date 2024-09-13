<template>
  <v-container class="">
    <v-row>
      <v-col cols="2" class="mt-2 pr-4">
        <v-row class="">
          <v-col cols="" class="">
            <v-card class="color-custom" variant="variant" title="TOP TAGS">
              <v-list class="color-custom">
                <v-list-item-group>
                  <v-list-item v-for="(count, status) in contarTicketsPorTags" :key="status" class="">
                    <v-row>
                      <v-col cols="7">
                        <v-list-item-content>
                          <v-list-item-title class="d-inline-block"><b>{{ count }}</b></v-list-item-title>
                        </v-list-item-content>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="2" class="mt-2 ml-2">
        <v-row class="">
          <v-col cols="" class="">
            <v-card class="color-custom " variant="variant" title="PRIORIDADES">
              <v-list class="color-custom">
                <v-list-item-group>
                  <v-list-item v-for="(count, status) in contarTicketsPorPrioridade" :key="status" class="">
                    <v-row>
                      <v-col cols="1" class="mt-1">
                        <div :style="{ backgroundColor: getColor(status) }" class="status-bolinha mr-3"></div>
                      </v-col>
                      <v-col cols="7">
                        <v-list-item-content>
                          <v-list-item-title class="d-inline-block">{{ status }}: <b>{{ count }}</b></v-list-item-title>
                        </v-list-item-content>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card class="color-custom" variant="variant" title="STATUS TICKETS">
              <v-card-subtitle>
                Total de tickets em aberto: {{ totalTicketsEmAberto }}
              </v-card-subtitle>
              <v-list class="mt-3 color-custom">
                <v-list-item-group>
                  <v-list-item v-for="(count, status) in ordenarStatus(contarTicketsPorStatus)" :key="status" class="">
                    <v-row>
                      <v-col cols="1" class="mt-1">
                        <div :style="{ backgroundColor: getColor(status) }" class="status-bolinha mr-3"></div>
                      </v-col>
                      <v-col cols="9">
                        <v-list-item-content>
                          <v-list-item-title class="d-inline-block">{{ status }}: <b>{{ count }}</b></v-list-item-title>
                        </v-list-item-content>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="5" class="ml-5 mr-n12">
        <v-row>
          <v-col cols="11">
            <v-card class="mt-2 ml-n3 mr-1">
              <v-card-title variant="tonal" class="bg-red">
                TICKETS PENDENTES DE RETORNO | {{
                tituloticketsAtrasados.length }}
              </v-card-title>
              <v-list class="color-custom ticket-data-table">
                <v-list-item-group>
                  <v-list-item v-for="(ticket, title) in tituloticketsAtrasados" :key="title" class="">
                    <v-row>
                      <v-col cols="9">
                        <v-list-item-content>
                          <v-list-item-title class="d-inline-block">
                            <b>{{ title }}</b> |
                            <span class="text-red">{{ ticket.dataVencimento }}</span> |
                            {{ ticket.status }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-card class="mt-5 pr-4 color-custom" variant="tonal">
            <v-card-title>
              TICKETS ABERTOS NO MÊS
            </v-card-title>
            <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
              {{ quantidadeTicketsAbertosMes }}
            </div>
          </v-card>

          <v-card class="mt-5 ml-5 pr-4 color-custom" variant="tonal">
            <v-card-title>
              TICKETS ABERTOS NA SEMANA
            </v-card-title>
            <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
              {{ quantidadeTicketsAbertosSemana }}
            </div>
          </v-card>
        </v-row>

        <v-row>
          <v-card class="mt-5" variant="tonal color-custom">
            <v-card-title>
              TICKETS FECHADOS NO MÊS
            </v-card-title>
            <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
              {{ quantidadeTicketsFechadosMes }}
            </div>
          </v-card>

          <v-card class="mt-5 ml-5 color-custom" variant="tonal">
            <v-card-title>
              TICKETS FECHADOS NA SEMANA
            </v-card-title>
            <div class="d-flex justify-center pt-5 pb-5 text-h1 font-weight-black">
              {{ quantidadeTicketsFechadosSemana }}
            </div>
          </v-card>
        </v-row>
      </v-col>

      <v-col class="mt-2 ml-1" md="3">
        <v-row>
          <v-col>
            <v-card class="color-custom pb-1" variant="tonal">
              <v-card-title class="px-16 text-center">
                TOTAL TICKETS
              </v-card-title>
              <canvas class="mt-3" id="TicketPieChart"></canvas>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card class="">
              <v-card-title variant="tonal" class="color-custom">URGENTES ABERTOS NA SEMANA | {{
                tituloticketsPrioridadeAltaSemana.length }}</v-card-title>
              <v-list class="color-custom ticket-data-table">
                <v-list-item-group>
                  <v-list-item v-for="(title) in (tituloticketsPrioridadeAltaSemana)" :key="title" class="">
                    <v-row>
                      <v-col cols="9">
                        <v-list-item-content>
                          <v-list-item-title class="d-inline-block"><b>{{ title }}</b></v-list-item-title>
                        </v-list-item-content>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { QuantidadeTickets } from "@/scripts/QuantidadeTickets.js";
import { ListagemTickets } from "@/scripts/ListagemTickets.js";
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      quantidadeTicketsAbertosMes: 0,
      quantidadeTicketsAbertosSemana: 0,
      quantidadeTicketsFechadosMes: 0,
      quantidadeTicketsFechadosSemana: 0,
      totalTicketsEmAberto: 0,
      totalticketsAtrasados: 0,
      priorityCountWeek: 0,
      contarTicketsPorStatus: {},
      contarTicketsPorPrioridade: {},
      contarTicketsPorTags: {},
      tituloticketsAtrasados: {},
      tituloticketsPrioridadeAltaSemana: [],
      statusTicketAtrasado: [],
      refreshInterval: null,
      chart: null,  // Inicializa a variável chart
    };
  },
  async mounted() {
    await this.fetchData();
    this.startAutoRefresh();
  },
  methods: {
    async fetchData() {
      const quantidadeTickets = new QuantidadeTickets();
      const listagemTickets = new ListagemTickets();

      try {
        this.quantidadeTicketsAbertosMes = await quantidadeTickets.quantidadeTicketsAbertosMes();
        this.quantidadeTicketsAbertosSemana = await quantidadeTickets.quantidadeTicketsAbertosSemana();
        this.quantidadeTicketsFechadosMes = await quantidadeTickets.quantidadeTicketsFechadosMes();
        this.quantidadeTicketsFechadosSemana = await quantidadeTickets.quantidadeTicketsFechadosSemana();
        this.contarTicketsPorStatus = (await listagemTickets.contarTicketsPorStatus()).statusCount;
        this.contarTicketsPorPrioridade = await listagemTickets.contarTicketsPorPrioridade();
        this.totalTicketsEmAberto = (await listagemTickets.contarTicketsPorStatus()).totalTicket;
        this.contarTicketsPorTags = await listagemTickets.contarTicketsPorTags();
        this.totalticketsAtrasados = (await quantidadeTickets.totalticketsAtrasados()).totalticketsAtrasados;
        this.quantidadeTicketsPendentesRetornoCliente = (await quantidadeTickets.quantidadeTicketsPendentesRetornoCliente());
        this.tituloticketsAtrasados = (await quantidadeTickets.totalticketsAtrasados()).tituloticketsAtrasados;
        this.statusTicketAtrasado = (await quantidadeTickets.totalticketsAtrasados()).statusTicketAtrasado;
        this.tituloticketsPrioridadeAltaSemana = (await listagemTickets.prioridadesDaSemana()).tituloticketsPrioridadeAltaSemana;
        this.priorityCountWeek = (await listagemTickets.prioridadesDaSemana()).priorityCountWeek;
        this.updateChart();
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    },
    startAutoRefresh() {
      this.refreshInterval = setInterval(this.fetchData, 60000);
    },
    beforeDestroy() {
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
      if (this.chart) {
        this.chart.destroy();  // Destroi o gráfico ao desmontar o componente
      }
    },
    ordenarStatus(statusCount) {
      const ordemDesejada = [
        "a fazer",
        "em desenvolvimento",
        "negado dev",
        "ag. info",
        "reprovado qa",
        "ag. publicação",
        "publicado dev",
        "publicado master",
        "retornar cliente"
      ];

      const statusCountOrdenados = {};

      ordemDesejada.forEach(status => {
        if (statusCount[status] !== undefined) {
          statusCountOrdenados[status] = statusCount[status];
        }
      });

      return statusCountOrdenados;
    },

    getColor(status) {
      const colors = {
        "a fazer": "#FFC107",
        "em desenvolvimento": "#6985FF",
        "publicado dev": "#E78945",
        "publicado master": "#33A069",
        "ag. publicação": "#C580E6",
        "retornar cliente": "#40A6E6",
        "ag. info": "#E78945",
        "negado dev": "#DC646A",
        "reprovado qa": "#F9BE33",
        "urgent": "#E38388",
        "high": "#FBCB5C",
        "normal": "#879DFF"
      };
      return colors[status] || "#ccc";
    },

    createChart() {
      const ctx = document.getElementById('TicketPieChart').getContext('2d');

      this.chart = new Chart(ctx, {  // Atribui o gráfico a this.chart
        type: 'pie',
        data: {
          labels: [
            `Em dia: ${this.totalTicketsEmAberto - this.totalticketsAtrasados}  `, 
            `Atrasados: ${this.totalticketsAtrasados}`, 
            `Pendentes de retorno: ${this.quantidadeTicketsPendentesRetornoCliente}`
          ],
          datasets: [{
            data: [
              this.totalTicketsEmAberto - this.totalticketsAtrasados, 
              this.totalticketsAtrasados, 
              this.quantidadeTicketsPendentesRetornoCliente
            ],
            backgroundColor: ['#33A069', '#FFC107', '#E38388'],
          }]
        },
        options: {
          responsive: true,
          layout: {
            padding: {
              bottom: 20,
            }
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'start',
              labels: {
                boxWidth: 20,
                padding: 10,
                color: 'white',
                font: {
                  size: 16
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem}: ${tooltipItem.raw}`,
              }
            }
          }
        }
      });
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy(); // Destroi o gráfico existente antes de criar um novo
      }
      this.createChart(); // Recria o gráfico com os dados atualizados
    }
  }
};
</script>

<style scoped>
.status-bolinha {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.color-custom {
  background-color: #404040;
}

.ticket-data-table {
  max-height: 205px;
  overflow-y: auto;
}
</style>