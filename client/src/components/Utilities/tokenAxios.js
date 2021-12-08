import axios from 'axios'
import Cookies from 'js-cookie'
import { checkToken } from './functions'

const tokenAxios = axios.create()

tokenAxios.interceptors.request.use(async (req) => {

    req.headers = {
        "Authorization": `Bearer ${Cookies.get("authorToken")}`
    }

    const result = await checkToken()
    console.log(result)
    if(result.data.status === 200){
        console.log("I once go here")
        return req
    }
    console.log("Did I went here?")
    const newToken = await axios.post("http://localhost:5500/refreshToken", {
            refreshToken: Cookies.get("refreshToken")
        }
    )
    console.log("Hello world")
    console.log(newToken)
    Cookies.set("authorToken", newToken.authorToken)
    req.headers.Authorization = newToken.authorToken
},
(err) => {
    console.log("Error is triggered")
    return Promise.reject(err);
})

export default tokenAxios