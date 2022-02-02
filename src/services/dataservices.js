import axios from 'axios'


export const getUni = (key) => {
    let actualKey = key
    let response = axios.get(`http://universities.hipolabs.com/search?country=${actualKey}`)
    return response
}