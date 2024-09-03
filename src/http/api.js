const authorization = import.meta.env.VITE_VUE_APP_CHAVE_API;
const list_id = import.meta.env.VITE_VUE_APP_LIST_ID;

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
