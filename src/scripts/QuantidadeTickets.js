import { fetchTasks } from '../http/api.js'
import { TratamentoDatas } from './TratamentoDatas.js'

export class QuantidadeTickets {
    async quantidadeTicketsAbertosSemana() {
        const query = new URLSearchParams({
            date_created_gt: TratamentoDatas.convertData(TratamentoDatas.segundaDaSemana()), // Data de início
            date_created_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
            include_closed: 'true'           // Status dos tickets
        }).toString();

        const data = await fetchTasks(query);

        if (Array.isArray(data.tasks)) {
            return data.tasks.length;
        } else {
            console.error(`O formato dos tickets abertos na semana não é esperado. Erro: `, error)
            return 0;
        }
    }

    async quantidadeTicketsAbertosMes() {
        const query = new URLSearchParams({
            date_created_gt: TratamentoDatas.convertData(TratamentoDatas.diaInicioMes()), // Data de início
            date_created_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
            include_closed: 'true'           // Status dos tickets
        }).toString();

        const data = await fetchTasks(query);

        if (Array.isArray(data.tasks)) {
            return data.tasks.length;
        } else {
            console.error(`O formato dos tickets abertos no mês não é esperado. Erro: `, error)
            return 0;
        }
    }

    async quantidadeTicketsFechadosSemana() {
        const query = new URLSearchParams({
            date_updated_gt: TratamentoDatas.convertData(TratamentoDatas.segundaDaSemana()), // Data de início
            date_updated_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
            'statuses[]': ['Fechado']           // Status dos tickets
        }).toString();

        const data = await fetchTasks(query);

        if (Array.isArray(data.tasks)) {
            return data.tasks.length;
        } else {
            console.error(`O formato dos tickets fechados na semana não é esperado. Erro: `, error)
            return 0;
        }
    }

    async quantidadeTicketsFechadosMes() {
        const query = new URLSearchParams({
            date_updated_gt: TratamentoDatas.convertData(TratamentoDatas.diaInicioMes()), // Data de início
            date_updated_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
            'statuses[]': ['Fechado']           // Status dos tickets
        }).toString();

        const data = await fetchTasks(query);

        if (Array.isArray(data.tasks)) {
            return data.tasks.length;
        } else {
            console.error(`O formato dos tickets fechados no mês não é esperado. Erro: `, error)
            return 0;
        }
    }

    async quantidadeticketsAtrasados() {
        let quantidadeTicketsAtrasados = 0;

        const query = new URLSearchParams({
            include_closed: 'false'
        }).toString();

        const data = await fetchTasks(query);

        data.tasks.forEach(task => {
            const dataVencimento = task.due_date;
            
            if(dataVencimento < TratamentoDatas.diaAtual()) {
                quantidadeTicketsAtrasados ++;
            }
        });
        console.log(quantidadeTicketsAtrasados);
        
    }
};

async function run() {
    try {
        const analise = new QuantidadeTickets;
        // console.log(`Quantidade de tickets ABERTOS neste mês: ${await analise.quantidadeTicketsAbertosMes()}`);
        // console.log(`Quantidade de tickets ABERTOS nesta semana: ${await analise.quantidadeTicketsAbertosSemana()}`);
        // console.log(`Quantidade de tickets FECHADOS neste mês: ${await analise.quantidadeTicketsFechadosMes()}`);
        // console.log(`Quantidade de tickets FECHADOS nesta semana: ${await analise.quantidadeTicketsFechadosSemana()}`);
        console.log(`Tickets por status: ${await analise.quantidadeticketsAtrasados()}`)
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
Tickets fechados
Atualizar a data de criação para a Data da solicitação (campos adicionais)
*/
