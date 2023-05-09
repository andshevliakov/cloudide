import axios from 'axios';
import routes from "../../routes";
import managerUrl from '../../envloader';

class PackageManager {

    installPackage = async (searchTerm) => {
        const url = managerUrl + routes.packageRoute.installPackage;
        try {
            const response = await axios.post(url, {
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