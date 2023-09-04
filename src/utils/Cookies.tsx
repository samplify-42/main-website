import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (key:string) => {
    return cookies.get(key)
}

export const setCookie = (key:string, value:string, path:string,date=Date.now() + 60 * 60 * 24 * 1000) => {
    //@ts-ignore
    return cookies.set(key, value, {path, date})
}


export const removeCookie=(key:string)=>{
    return cookies.remove(key,{path:"/"})
}