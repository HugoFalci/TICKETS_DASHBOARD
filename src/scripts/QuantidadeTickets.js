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

    async quantidadeTicketsPendentesRetornoCliente() {
        const query = new URLSearchParams();
        query.append('include_closed', 'false');

        const statuses = ['ag. publicação', 'publicado dev', 'publicado master', 'retornar cliente'];
        statuses.forEach(status => query.append('statuses[]', status));

        const data = await fetchTasks(query.toString());

        const quantidadeTicketsPendentesRetornoCliente = data.tasks.length;

        console.log('Quantidade de tickets pendentes de retorno ao cliente: ', quantidadeTicketsPendentesRetornoCliente);
        return quantidadeTicketsPendentesRetornoCliente; // Pendente de front
    }

    async totalticketsAtrasados() {
        const query = new URLSearchParams({
            include_closed: 'false'
        }).toString();

        const data = await fetchTasks(query);

        let totalticketsAtrasados = 0;
        const tituloticketsAtrasados = {};

        data.tasks.forEach(task => {
            const dataVencimento = task.due_date;

            if (dataVencimento < TratamentoDatas.dataMilisegundos()) {
                tituloticketsAtrasados[task.name] = TratamentoDatas.conversorParaData(dataVencimento);

                totalticketsAtrasados++;
            }
        });
        console.log('Total de tickets atrasados: ', totalticketsAtrasados);
        console.log('Titulo dos tickets atrasados: ', tituloticketsAtrasados);
        return { totalticketsAtrasados, tituloticketsAtrasados }; // Pendentes de front
    }
};

// async function run() {
//     try {
//         const analise = new QuantidadeTickets;
//         // console.log(`Quantidade de tickets ABERTOS neste mês: ${await analise.quantidadeTicketsAbertosMes()}`);
//         // console.log(`Quantidade de tickets ABERTOS nesta semana: ${await analise.quantidadeTicketsAbertosSemana()}`);
//         // console.log(`Quantidade de tickets FECHADOS neste mês: ${await analise.quantidadeTicketsFechadosMes()}`);
//         // console.log(`Quantidade de tickets FECHADOS nesta semana: ${await analise.quantidadeTicketsFechadosSemana()}`);
//         await analise.quantidadeTicketsPendentesRetornoCliente();
//         await analise.totalticketsAtrasados();
//         ;
//     } catch (error) {
//         console.error('Erro ao buscar tarefas:', error);
//     }
// }

// run();
