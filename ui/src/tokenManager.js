import axios from "axios"
import managerUrl from "./envloader"
import routes from "./routes"

export async function verifyToken(token) {
    const url = managerUrl + routes.token_route + '/verify'
    try {
        await axios.post( url, {
            'token': token
        })
        return true
    } catch(error) {
        if (error.response && error.response.status !== 401) {
            console.log(error.response.status + error.response.data)
        }
        return false
    }
}
