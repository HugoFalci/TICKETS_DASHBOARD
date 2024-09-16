<template>
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
</template>

<script>
import { QuantidadeTickets } from "@/scripts/QuantidadeTickets.js";

export default {
    data() {
        return {
            quantidadeTicketsAbertosMes: 0,
            quantidadeTicketsAbertosSemana: 0,
            quantidadeTicketsFechadosMes: 0,
            quantidadeTicketsFechadosSemana: 0
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            const quantidadeTickets = new QuantidadeTickets();

            try {
                this.quantidadeTicketsAbertosMes = await quantidadeTickets.quantidadeTicketsAbertosMes();
                this.quantidadeTicketsAbertosSemana = await quantidadeTickets.quantidadeTicketsAbertosSemana();
                this.quantidadeTicketsFechadosMes = await quantidadeTickets.quantidadeTicketsFechadosMes();
                this.quantidadeTicketsFechadosSemana = await quantidadeTickets.quantidadeTicketsFechadosSemana();
            } catch (error) {
                console.error("Erro ao buscar dados: ", error);
            }
        }
    }
}
</script>

<style scoped>
.color-custom {
    background-color: #404040;
}
</style>