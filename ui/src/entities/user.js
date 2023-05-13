import { SHA256 } from 'crypto-js';

class User{
    constructor(name,surname,username,password='') {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = this.hashPassword(password);
    };

    hashPassword = (password) => {
        if (password !== '')
            return SHA256(password).toString();
        return password
    };
}

export default User;