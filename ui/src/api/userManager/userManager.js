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

    createUser = async (user) => {
    const url = managerUrl + routes.userRoute.createUser;
    try {
      const response = await axios.post(url, {
        'name': user.name,
        'surname': user.surname,
        'username': user.username,
        'password': user.password,
      });
      return response
    } catch (error) {
      console.error(`${error.response.status} ${error.response.data}`);
      return error.response
    }
  };
}

export default UserManager;