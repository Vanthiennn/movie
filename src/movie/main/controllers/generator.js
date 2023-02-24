import axios from "axios"

export function fetchAPI(method,url) {
    return axios({
        method: method,
        url: url
    })
}

export const API_KEY = 'api_key=afefe240921dda892f10e8deeaab383d'
