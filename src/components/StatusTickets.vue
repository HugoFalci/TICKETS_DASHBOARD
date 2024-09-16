<template>
    <v-col cols="2" class="mt-2 ml-2">
    <v-row>
        <v-col>
            <v-card class="color-custom " variant="variant" title="PRIORIDADES">
                <v-list class="color-custom">
                    <v-list-item-group>
                        <v-list-item v-for="(count, status) in contarTicketsPorPrioridade" :key="status">
                            <v-row>
                                <v-col cols="1" class="mt-1">
                                    <div :style="{ backgroundColor: getColor(status) }" class="status-bolinha mr-3">
                                    </div>
                                </v-col>
                                <v-col cols="7">
                                    <v-list-item-content>
                                        <v-list-item-title class="d-inline-block">{{ status }}: <b>{{ count
                                                }}</b></v-list-item-title>
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
                        <v-list-item v-for="(count, status) in ordenarStatus(contarTicketsPorStatus)" :key="status">
                            <v-row>
                                <v-col cols="1" class="mt-1">
                                    <div :style="{ backgroundColor: getColor(status) }" class="status-bolinha mr-3">
                                    </div>
                                </v-col>
                                <v-col cols="9">
                                    <v-list-item-content>
                                        <v-list-item-title class="d-inline-block">{{ status }}: <b>{{ count
                                                }}</b></v-list-item-title>
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
            <v-card class="color-custom" variant="variant" title="TOP TAGS">
                <v-list class="color-custom">
                    <v-list-item-group>
                        <v-list-item v-for="(count, status) in contarTicketsPorTags" :key="status">
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
</template>

<script>
import { ListagemTickets } from "@/scripts/ListagemTickets.js";

export default {
    data() {
        return {
            totalTicketsEmAberto: 0,
            contarTicketsPorStatus: {},
            contarTicketsPorPrioridade: {},
            contarTicketsPorTags: {},
        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            const listagemTickets = new ListagemTickets();

            try {
                this.contarTicketsPorStatus = (await listagemTickets.contarTicketsPorStatus()).statusCount;
                this.contarTicketsPorPrioridade = await listagemTickets.contarTicketsPorPrioridade();
                this.totalTicketsEmAberto = (await listagemTickets.contarTicketsPorStatus()).totalTicket;
                this.contarTicketsPorTags = await listagemTickets.contarTicketsPorTags();
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
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
        }
    }
}
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
</style>