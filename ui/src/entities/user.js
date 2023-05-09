import { SHA256 } from 'crypto-js';

class User{
    constructor(name,username,password) {
        this.name = name;
        this.username = username;
        this.password = this.hashPassword(password);
    };

    hashPassword = (password) => {
        return SHA256(password).toString();
    };
}

export default User;