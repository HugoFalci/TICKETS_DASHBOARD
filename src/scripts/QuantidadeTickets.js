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
        let totalTickets = 0;
        let hasMorePages = true;
        let page = 0; // Página inicial
        const maxPages = 10; // Limite máximo de páginas para evitar loop infinito (ajuste conforme necessário)
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Função para adicionar atraso
    
        while (hasMorePages && page < maxPages) {
            const queryParams = new URLSearchParams({
                date_updated_gt: TratamentoDatas.convertData(TratamentoDatas.diaInicioMes()), // Data de início
                date_updated_lt: TratamentoDatas.convertData(TratamentoDatas.diaAtual()), // Data de fim
                'statuses[]': ['Fechado'],           // Status dos tickets
                page: page.toString(), // Página atual (começa de 0)
                per_page: '100', // Limite de 100 tickets por página
                include_closed: 'true' // Incluir tickets fechados
            }).toString();
    
            try {
                const data = await fetchTasks(queryParams);
    
                if (Array.isArray(data.tasks)) {
                    totalTickets += data.tasks.length;
    
                    // Verifica se há mais páginas de tickets
                    if (data.tasks.length < 100) {
                        hasMorePages = false; // Se o número de tickets retornados for menor que 100, não há mais páginas
                    } else {
                        page++; // Se há mais tickets, incrementa a página
                    }
    
                    // Adiciona um pequeno atraso para evitar sobrecarga no servidor
                    await delay(500); // Atraso de 500ms entre as requisições (ajuste conforme necessário)
                } else {
                    console.error(`O formato dos tickets fechados no mês não é esperado.`);
                    return 0;
                }
            } catch (error) {
                console.error(`Erro ao buscar tarefas: `, error);
                return 0;
            }
        }
    
        // Se o limite de páginas foi atingido, avisa o usuário
        if (page >= maxPages) {
            console.warn('Limite de páginas atingido. Nem todos os tickets podem ter sido recuperados.');
        }
    
        return totalTickets;
    } 

    async quantidadeTicketsPendentesRetornoCliente() {
        const query = new URLSearchParams();
        query.append('include_closed', 'false');

        const statuses = ['ag. publicação', 'publicado dev', 'publicado master', 'retornar cliente'];
        statuses.forEach(status => query.append('statuses[]', status));

        const data = await fetchTasks(query.toString());
        const tituloticketsPendentesRetorno = {};
        const quantidadeTicketsPendentesRetornoCliente = data.tasks.length;

        data.tasks.forEach(task => {
            const dataVencimento = task.due_date;

            tituloticketsPendentesRetorno[task.name] = {
                title: task.name,
                dataVencimento: TratamentoDatas.conversorParaData(dataVencimento),
                status: task.status.status
            };
        })

        return { quantidadeTicketsPendentesRetornoCliente, tituloticketsPendentesRetorno }; // Pendente de front
    }

    async totalticketsAtrasados() {
        const query = new URLSearchParams({
            include_closed: 'false'
        }).toString();

        const data = await fetchTasks(query);

        let totalticketsAtrasados = 0;
        const tituloticketsAtrasados = {};
        const statusTicketAtrasado = []

        data.tasks.forEach(task => {
            const dataVencimento = task.due_date;

            if (dataVencimento < TratamentoDatas.dataMilisegundos()) {
                tituloticketsAtrasados[task.name] = {
                    dataVencimento: TratamentoDatas.conversorParaData(dataVencimento),
                    status: task.status.status
                };

                statusTicketAtrasado.push(task.status.status)
                totalticketsAtrasados++;
            }
        });
        console.log('Total de tickets atrasados: ', totalticketsAtrasados);
        console.log('Titulo dos tickets atrasados: ', tituloticketsAtrasados);
        console.log('Status dos tickets atrasados: ', statusTicketAtrasado);
        return { totalticketsAtrasados, tituloticketsAtrasados, statusTicketAtrasado }; // Pendentes de front
    }
};

async function run() {
    try {
        const analise = new QuantidadeTickets;
        // console.log(`Quantidade de tickets ABERTOS neste mês: ${await analise.quantidadeTicketsAbertosMes()}`);
        // console.log(`Quantidade de tickets ABERTOS nesta semana: ${await analise.quantidadeTicketsAbertosSemana()}`);
        // console.log(`Quantidade de tickets FECHADOS neste mês: ${await analise.quantidadeTicketsFechadosMes()}`);
        // console.log(`Quantidade de tickets FECHADOS nesta semana: ${await analise.quantidadeTicketsFechadosSemana()}`);
        console.log(await analise.quantidadeTicketsFechadosMes())
            ;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

run();
