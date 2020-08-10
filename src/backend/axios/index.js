import axios from 'axios';

const API_URL = 'http:localhost:3000/api/v1'

// const securedAxiosInstance = axios.create({
//     baseURL: API_URL,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })

const actions = {
    async logIn({ commit }) {
        const response = await axios.get(API_URL + "/")
    }
}

