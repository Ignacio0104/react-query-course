import axios from "axios"

const client = axios.create({baseURL: "http://localhost:4000"})

export const request =({...options})=>{
    client.defaults.headers.common.Authorization = "Bearer token"
    const onSucces = (res) => res;
    const onError= (err) => err;
    return client(options).then(onSucces).catch(onError)
}