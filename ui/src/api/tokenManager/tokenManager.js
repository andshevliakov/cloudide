import api from "../api";
import routes from "../../routes";

class TokenManager {

    verifyToken = async () => {
        try {
            await api.get(routes.tokenRoute.verifyToken);
            return true;
        } catch(error) {
            if (error.response && error.response.status !== 401) {
                console.error(`${error.response.status} ${error.response.data}`);
            }
            return false;
        }
    };

    generateToken = async (username) => {
        try {
            const response = await api.get(routes.tokenRoute.generateToken, {
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