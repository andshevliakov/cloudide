import axios from 'axios';
import routes from "../../routes";
import managerUrl from '../../envloader';

class CodeManager {

    handleRun = async (code) => {
        const url = managerUrl + routes.codeRoute.runCode;
        try {
            const response = await axios.post(url, {
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