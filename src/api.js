import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // headers:{
    //     'Content-Type': 'multipart/form-data'
    // }
    
})
console.log("Base URL being used:", process.env.REACT_APP_BACKEND_URL);

export default api
