import axios from 'axios';

export const getBreaches = async (offset: number) => {
   const response = await axios({
        method: 'get',
        url: 'https://hiring.guardio.dev/fe/breaches',
        params: {
            offset: offset
        },
        headers: {'X-Best-Pokemon': 'pikachu'}
    })
    return response.data
}