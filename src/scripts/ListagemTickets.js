import { fetchTasks } from '../http/api.js'
import { TratamentoDatas } from './TratamentoDatas.js'

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

    async prioridadesDaSemana() {
        const query = new URLSearchParams({
            date_created_gt: TratamentoDatas.convertData(TratamentoDatas.segundaDaSemana()), // Data de início
            date_created_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
            include_closed: 'true'           // Status dos tickets
        }).toString();

        const priorityCountWeek = {};
        const tituloticketsPrioridadeAltaSemana = [];
        const data = await fetchTasks(query);

        data.tasks.forEach(task => {
            const priority = task.priority.priority;

            if (priorityCountWeek[priority]) {
                priorityCountWeek[priority]++;
            } else {
                priorityCountWeek[priority] = 1;
            }

            if (priority === 'urgent' && !tituloticketsPrioridadeAltaSemana.includes(task.name)) {
                tituloticketsPrioridadeAltaSemana.push(task.name);
            }
        });

        return { priorityCountWeek, tituloticketsPrioridadeAltaSemana };
    }

    async buscarTagPorId(api) {
        const allTags = {}

        api.tasks.forEach(task => {
            const tagsTickets = task.custom_fields.find((tagTicket) => tagTicket.name === "Tags").value;
            // console.log(tagsTickets);

            if (Array.isArray(tagsTickets)) {
                tagsTickets.forEach(tag => {
                    if (allTags[tag]) {
                        allTags[tag]++;
                    } else {
                        allTags[tag] = 1;
                    }
                });
            } else {
                console.error('A tag não é um array: ', tagsTickets);
            }
        });
        // console.log(allTags);

        return allTags;
    }

    async renomearTag(idTag, api) {
        const tagsRenomeadas = {};
        const nomesTags = api.tasks[0].custom_fields.find((tagTicket) => tagTicket.name === "Tags").type_config.options;

        for (const [id, value] of Object.entries(idTag)) {
            const acharNomeTag = nomesTags.find(item => item.id === id);

            if (acharNomeTag) {
                tagsRenomeadas[acharNomeTag.label] = value;
            } else {
                tagsRenomeadas[id];
            }
        }

        const tagsOrdenadas = Object.fromEntries(Object.entries(tagsRenomeadas).sort(([, a], [, b]) => b - a));
        const topTags = Object.entries(tagsOrdenadas).slice(0, 10);

        return topTags;
    }

    async contarTicketsPorTags() {
        const query = new URLSearchParams({
            include_closed: 'false'
        })

        const data = await fetchTasks(query);
        const idDosTickets = await this.buscarTagPorId(data)
        const tagsDosTickets = await this.renomearTag(idDosTickets, data)
        const tagFormatada = tagsDosTickets.map(([tag, quantidade], index) => {
            return `${tag}: ${quantidade}`;
        })

        return tagFormatada;
    }
}

async function run() {
    try {
        const analise = new ListagemTickets;
        // console.log(`Quantidade de tickets ABERTOS neste mês: ${await analise.quantidadeTicketsAbertosMes()}`);
        // console.log(`Quantidade de tickets ABERTOS nesta semana: ${await analise.quantidadeTicketsAbertosSemana()}`);
        // console.log(`Quantidade de tickets FECHADOS neste mês: ${await analise.quantidadeTicketsFechadosMes()}`);
        // console.log(`Quantidade de tickets FECHADOS nesta semana: ${await analise.quantidadeTicketsFechadosSemana()}`);
        console.log(`Tickets por status: ${await analise.prioridadesDaSemana()}`);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

run();