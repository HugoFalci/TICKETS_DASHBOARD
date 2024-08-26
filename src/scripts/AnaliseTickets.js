import { fetchTasks } from '../http/api.js'
import { TratamentoDatas } from './TratamentoDatas.js'

export class AnaliseTickets {

    async quantidadeTicketsSemana() {
        const query = new URLSearchParams({
            date_created_gt: TratamentoDatas.convertData(), // Data de início
            date_created_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
            include_closed: 'false'           // Status dos tickets
        }).toString();
        const data = await fetchTasks(query);

        if (Array.isArray(data.tasks)) {
            return data.tasks.length;
        } else {
            console.error(`O formato não é esperado. Erro: `, error)
            return 0;
        }
    }

    async quantidadeTicketsMes() {
        const query = new URLSearchParams({
            date_created_gt: TratamentoDatas.convertData(TratamentoDatas.diaInicioMes()), // Data de início
            date_created_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
            include_closed: 'false'           // Status dos tickets
        }).toString();
        const data = await fetchTasks(query);

        if (Array.isArray(data.tasks)) {
            return data.tasks.length;
        } else {
            console.error(`O formato não é esperado. Erro: `, error)
            return 0;
        }
    }
};

async function run() {
    try {
        const analise = new AnaliseTickets;
        console.log(`Quantidade de tickets neste mês: ${await analise.quantidadeTicketsMes()}`);
        console.log(`Quantidade de tickets nesta semana: ${await analise.quantidadeTicketsSemana()}`);
        ;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

run();



/* 
Prazo de entrega dos tickets
Tempo de vida
Top tags utilizadas
Atualizar a data de criação para a Data da solicitação (campos adicionais)
*/
