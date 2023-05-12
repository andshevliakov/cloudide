import api from "../api";
import routes from "../../routes";

class CodeManager {

    handleRun = async (code) => {
        try {
            const response = await api.post(routes.codeRoute.runCode, {
                'code': code
            });
            return response;
        } catch (error) {
            console.error(`${error.response.status} ${error.response.data}`);
            return error.response;
        }
    };

}

export default CodeManager;