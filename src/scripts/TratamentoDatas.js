export class TratamentoDatas {
    static convertData(dateString) {
        const date = new Date(dateString);
        return date.getTime().toString();
    }

    static diaInicioMes() {
        const diaInicioMes = new Date();
        const inicioMes = new Date(diaInicioMes.getFullYear(), diaInicioMes.getMonth(), 1);
        return inicioMes.toISOString().split('T')[0] + 'T00:00:00.000Z';
    }

    static diaAtual() {
        const diaAtual = new Date();
        return diaAtual.toISOString().split('T')[0] + 'T23:59:59.000Z';
    }

    static segundaDaSemana() {
        const diaAtual = new Date();
        const diaDaSemana = diaAtual.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
        const diff = diaAtual.getDate() - diaDaSemana + (diaDaSemana === 0 ? -6 : 1);
        const segundaFeira = new Date(diaAtual.setDate(diff));
        return segundaFeira.toISOString().split('T')[0] + 'T00:00:00.000Z';
    }
    
    static dataMilisegundos() {
        const dataAtual = this.diaAtual();
        const dataMilisegundos = new Date(dataAtual);
        return dataMilisegundos.getTime();
    }

    static conversorParaData(dataMilisegundos) {
        const date = new Date(parseInt(dataMilisegundos, 10));

        if (isNaN(date.getTime())) {
            console.error(`Deu ruim aqui: ${dataMilisegundos}`);
            return 'Data inválida';
        }

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const ano = date.getFullYear();
    
        return `${dia}/${mes}/${ano}`;
    }
}

export default TratamentoDatas;