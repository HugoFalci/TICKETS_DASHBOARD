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
}

export default TratamentoDatas;


console.log(TratamentoDatas.diaInicioMes());