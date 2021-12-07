import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class IdentityApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://identity-ms-gsi6zlxgzq-uc.a.run.app';
    }

    //login
    async login(username, password) {
        const response = await axios.post(this.baseURL + '/login?username=' + username + '&password=' + password);
        console.log(response);
        return response.data;
    }
    async logout(token){
        const response = await axios.get(this.baseURL + '/logout?access_token=' + token );
        return response.data;
    }
}