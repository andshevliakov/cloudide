import api from '../api';
import routes from '../../routes';

class PackageManager {

    installPackage = async (searchTerm) => {
        try {
            const response = await api.post(routes.packageRoute.installPackage, {
                'packageName': searchTerm
            });
            return response;
        } catch (error) {
            console.error(`${error.response.status} ${error.response.data}`);
            return error.response;
        }
    };
}

export default PackageManager;