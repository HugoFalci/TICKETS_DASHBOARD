const authorization = 'pk_75349639_WBVUZF7JYVN5W3C6IWU1A8WXFGFJVYSM';
const list_id = '900701897966';
const space_id = '3243445';

export async function fetchTasks(query) {
    try {
        const resp = await fetch(
            `https://api.clickup.com/api/v2/list/${list_id}/task?${query}`,
            {
                method: 'GET',
                headers: {
                    Authorization: authorization,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!resp.ok) {
            throw new Error(`Erro na busca dos tickets! Status ${resp.status}`)
        }

        const data = await resp.json();

        return data;

    } catch (error) {
        console.error(`Erro fatching task: `, error);
        return null
    }
}
