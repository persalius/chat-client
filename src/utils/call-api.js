import axios from "axios";

export default function callApi(endpoint, token, options, payload) {
    const authHeaders = token ? {"Authorization": `Bearer ${token}`} : {};

    return axios({
        method: 'GET',
        headers: {
            "Accept": "application/json",
            'content-type': "application/json",
            ...authHeaders
        },
        data: payload,
        url: `http://localhost:8000/v1/${endpoint}`,
        ...options
    })
        .then(result => {
            if (result.data.success) {
                return result;
            }
            throw new Error(result.data.message);
        })
}
