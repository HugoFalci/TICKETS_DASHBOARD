import { fetchTasks, fetchTasksTags } from '../http/api.js'

export class ListagemTickets {
    async contarTicketsPorStatus() {
        const query = new URLSearchParams({
            include_closed: 'false'
        })
        const statusCount = {};
        let totalTicket = 0;

        const data = await fetchTasks(query);

        data.tasks.forEach(task => {
            const status = task.status.status;

            if (statusCount[status]) {
                statusCount[status]++;
            } else {
                statusCount[status] = 1;
            }

            totalTicket++;
        });

        return { statusCount, totalTicket };
    }

    async contarTicketsPorPrioridade() {
        const query = new URLSearchParams({
            include_closed: 'false'
        })
        const priorityCount = {};

        const data = await fetchTasks(query);

        data.tasks.forEach(task => {
            const priority = task.priority.priority;

            if (priorityCount[priority]) {
                priorityCount[priority]++;
            } else {
                priorityCount[priority] = 1;
            }
        });

        return priorityCount;
    }

    async buscarTagPorId(api) {
        const allTags = {}

        api.tasks.forEach(task => {
            const tagsTickets = task.custom_fields.find((teste) => teste.name === "Tags").value.forEach();
            console.log(tagsTickets);

            if (allTags[tagsTickets]) {
                allTags[tagsTickets]++;
            } else {
                allTags[tagsTickets] = 1;
            }
        });

        return allTags;
    }

    async contarTicketsPorTags() {
        const query = new URLSearchParams({
            include_closed: 'false'
        })

        const data = await fetchTasks(query);
        const tagsDosTickets = await this.buscarTagPorId(data)

        return tagsDosTickets;
    }
}

async function run() {
    try {
        const analise = new ListagemTickets;
        // console.log(`Quantidade de tickets ABERTOS neste mês: ${await analise.quantidadeTicketsAbertosMes()}`);
        // console.log(`Quantidade de tickets ABERTOS nesta semana: ${await analise.quantidadeTicketsAbertosSemana()}`);
        // console.log(`Quantidade de tickets FECHADOS neste mês: ${await analise.quantidadeTicketsFechadosMes()}`);
        // console.log(`Quantidade de tickets FECHADOS nesta semana: ${await analise.quantidadeTicketsFechadosSemana()}`);
        console.log(`Tickets por status: ${await analise.contarTicketsPorTags()}`)
            ;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

run();