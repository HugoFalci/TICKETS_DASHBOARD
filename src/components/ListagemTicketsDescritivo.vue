<template>
    <v-row>
        <v-col cols="11">
            <v-card class="mt-2 ml-n3 mr-1">
                <v-card-title variant="tonal" class="bg-red">
                    TICKETS PENDENTES DE RETORNO: {{
                        quantidadeTicketsPendentesRetornoCliente }}
                </v-card-title>
                <v-list class="color-custom ticket-data-table">
                    <v-list-item-group>
                        <v-list-item v-for="(ticket, title) in tituloticketsPendentesRetorno" :key="title" class="">
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

    <!-- <v-row>
        <v-col cols="11">
            <v-card class="mt-2 ml-n3 mr-1">
                <v-card-title variant="tonal" class="bg-red">
                    TICKETS ABERTOS:
                </v-card-title>
                <v-list class="color-custom ticket-data-table">
                    <v-list-item-group>
                        <v-list-item v-for="(ticket, title) in tituloticketsAbertos" :key="title" class="">
                            <v-row>
                                <v-col cols="9">
                                    <v-list-item-content>
                                        <v-list-item-title class="d-inline-block">
                                            <b>{{ ticket }}</b> |
                                            <span class="text-red">{{ ticket.name }}</span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-col>
                            </v-row>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-col>
    </v-row> -->

    <v-row>
        <v-col cols="11" class="ml-n3">
            <v-card class=" mr-n2">
                <v-card-title variant="tonal" class="bg-red">URGENTES NA SEMANA: {{
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
</template>

<script>
import { ListagemTickets } from "@/scripts/ListagemTickets.js";
import { QuantidadeTickets } from "@/scripts/QuantidadeTickets.js";

export default {
    data() {
        return {
            quantidadeTicketsPendentesRetornoCliente: 0,
            tituloticketsPendentesRetorno: {},
            tituloticketsPrioridadeAltaSemana: [],
            tituloticketsAbertos: [],

        };
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            const quantidadeTickets = new QuantidadeTickets();
            const listagemTickets = new ListagemTickets();

            try {
                this.quantidadeTicketsPendentesRetornoCliente = (await quantidadeTickets.quantidadeTicketsPendentesRetornoCliente()).quantidadeTicketsPendentesRetornoCliente;
                this.tituloticketsPendentesRetorno = (await quantidadeTickets.quantidadeTicketsPendentesRetornoCliente()).tituloticketsPendentesRetorno;
                // this.tituloticketsAbertos = (await quantidadeTickets.quantidadeTicketsAbertosMes()).tituloticketsAbertos;
                this.tituloticketsPrioridadeAltaSemana = (await listagemTickets.prioridadesDaSemana()).tituloticketsPrioridadeAltaSemana;
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        }
    }
}
</script>

<style scoped>
.ticket-data-table {
    max-height: 184px;
    overflow-y: auto;
}

.color-custom {
    background-color: #404040;
}
</style>