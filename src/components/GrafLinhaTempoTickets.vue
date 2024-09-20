<template>
    <v-col class="mt-2 ml-1 ml-n4" lg="5" md="3">
        <v-row>
            <v-col class="" lg="8" md="3">
                <v-card class="color-custom pb-5" variant="tonal">
                    <v-card-title variant="tonal" class="px-16 text-center text-white">
                        LINHA DO TEMPO DOS TICKETS
                    </v-card-title>
                    <canvas class="mt-3" id="TicketPieChart"></canvas>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { QuantidadeTickets } from "@/scripts/QuantidadeTickets.js";
import { ListagemTickets } from "@/scripts/ListagemTickets.js";
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            totalTicketsEmAberto: 0,
            totalticketsAtrasados: 0,
            quantidadeTicketsPendentesRetornoCliente: 0,
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
                this.totalTicketsEmAberto = (await listagemTickets.contarTicketsPorStatus()).totalTicket;
                this.totalticketsAtrasados = (await quantidadeTickets.totalticketsAtrasados()).totalticketsAtrasados;
                this.quantidadeTicketsPendentesRetornoCliente = (await quantidadeTickets.quantidadeTicketsPendentesRetornoCliente()).quantidadeTicketsPendentesRetornoCliente;
                this.statusTicketAtrasado = (await quantidadeTickets.totalticketsAtrasados()).statusTicketAtrasado;
                this.updateChart();
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        },
        createChart() {
            const canvas = document.getElementById('TicketPieChart');

            if (!canvas) {
                console.error("Canvas element not found");
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Failed to get 2D context");
                return;
            }

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [
                        `Em dia: ${this.totalTicketsEmAberto - this.totalticketsAtrasados}`,
                        `Atrasados: ${this.totalticketsAtrasados}`,
                        `Pendentes: ${this.quantidadeTicketsPendentesRetornoCliente}`
                    ],
                    datasets: [{
                        data: [
                            this.totalTicketsEmAberto - this.totalticketsAtrasados,
                            this.totalticketsAtrasados,
                            this.quantidadeTicketsPendentesRetornoCliente
                        ],
                        backgroundColor: [
                            'rgba(51, 160, 105, 0.6)',  // Verde transparente (Em dia)
                            'rgba(255, 193, 7, 0.6)',   // Amarelo transparente (Atrasados)
                            'rgba(227, 131, 136, 0.6)'  // Vermelho transparente (Pendentes)
                        ],
                        borderColor: [
                            'rgba(102, 255, 102, 1)',    // Verde claro (Em dia) com borda opaca
                            'rgba(255, 235, 59, 1)',     // Amarelo claro (Atrasados) com borda opaca
                            'rgba(255, 99, 132, 1)'      // Rosa claro (Pendentes) com borda opaca
                        ],
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                            position: 'top',
                            labels: {
                                color: 'white',  // Cor dos rótulos da legenda
                                font: {
                                    size: 36       // Tamanho da fonte dos rótulos da legenda
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'white'  // Cor dos rótulos do eixo x
                            }
                        },
                        y: {
                            ticks: {
                                color: 'white'  // Cor dos rótulos do eixo y
                            }
                        }
                    }
                }
            });
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
        updateChart() {
            if (this.chart) {
                this.chart.destroy(); // Destroi o gráfico existente antes de criar um novo
            }
            this.createChart(); // Recria o gráfico com os dados atualizados
        }
    }
}
</script>

<style scoped>
.color-custom {
    background-color: #404040;
}
</style>