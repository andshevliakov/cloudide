import axios from "axios";
import managerUrl from "../../envloader";
import routes from "../../routes";

class TokenManager {

    verifyToken = async (token) => {
        const url = managerUrl + routes.tokenRoute.verifyToken;
        try {
            await axios.post( url, {
                'token': token,
            });
            return true;
        } catch(error) {
            if (error.response && error.response.status !== 401) {
                console.error(`${error.response.status} ${error.response.data}`);
            }
            return false;
        }
    };

    generateToken = async (username) => {
        const url = managerUrl + routes.tokenRoute.generateToken
        try {
            const response = await axios.get(url, {
              params: {
                username: username,
              }
            });
            return response
          } catch (error) {
            console.error(`${error.response.status} ${error.response.data}`);
            return error.response
          }
    };

}

export default TokenManager;