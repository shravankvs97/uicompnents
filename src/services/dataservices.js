import axios from 'axios'


export const getUni = (key) => {
    let actualKey = key
    let response = axios.get(`http://universities.hipolabs.com/search?country=${actualKey}`)
    return response
}

export const reverseGeoCoding = async(obj) => {

    let response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${obj.lat}&lon=${obj.lng}&format=json`)

    return response
}