import api from '../api';
import routes from '../../routes';

class UserManager {

    verifyUser = async (user) => {
        try {
            const response = await api.get(routes.userRoute.verifyUser, {
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
    try {
      const response = await api.post(routes.userRoute.createUser, {
        ...user,
      });
      return response
    } catch (error) {
      console.error(`${error.response.status} ${error.response.data}`);
      return error.response
    }
  };

  getUser = async () => {
    try {
      const response = await api.get(routes.userRoute.getUser);
      return response;
    } catch (error) {
      console.error(`${error.response.status} ${error.response.data}`);
      return error.response;
    }
  }

  updateUser = async (user) => {
    try {
      const response = await api.put(routes.userRoute.updateUser, {
        ...user,
      })
      return response;
    } catch(error) {
      console.error(`${error.response.status} ${error.response.data}`);
      return error.response;
    }
  }
}

export default UserManager;