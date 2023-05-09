import axios from 'axios';
import routes from "../../routes";
import managerUrl from '../../envloader';

class UserManager {

    verifyUser = async (user) => {
        const url = managerUrl + routes.userRoute.verifyUser;
        try {
            const response = await axios.get(url, {
            params: {
              username: user.username,
              password: user.password,
            }
        });
            return response;
        } catch (error) {
            return error.response;
        }
    };
}

export default UserManager;