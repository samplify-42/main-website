import axios from "axios"
import { getCookie } from "./Cookies";

const baseHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
}

export const AxiosService = (method:string, route:string, data = null) => {
    const baseURL = "http://localhost:3000/api"
    const config = {
        method,
        url: `${baseURL}${route}`,
        headers: baseHeader,
    };
    if (data) {
        //@ts-ignore
        config.data = data
    }

    axios.interceptors.request.use((conf) => {
        if (conf.headers.Authorization === undefined) {
            conf.headers.Authorization = `Bearer ${getCookie("token")}`
        }
        return conf
    })

    return axios(config)
        .then((response) => {
           return  response.data || null
        })
        .catch((error) => {
            return error.response?error.response.data: [{msg: "Something went wrong"}]
        });
}

export const AxiosServiceFormData = (method:string, route:string, data: any) => {
    console.log("axios", data)
    const baseURL = "http://localhost:3000/api"
    const config = {
        method,
        url: `${baseURL}${route}`,
        headers: baseHeader,
        data:data
    };

    axios.interceptors.request.use((conf) => {
        if (conf.headers.Authorization === undefined) {
            conf.headers.Authorization = `Bearer ${getCookie("token")}`
        }
        return conf
    })

    return axios(config)
        .then((response) => {
           return  response.data || null
        })
        .catch((error) => {
            return error.response?error.response.data: [{msg: "Something went wrong"}]
        });
}