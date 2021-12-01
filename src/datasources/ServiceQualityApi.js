import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class ServiceQualityApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://servicequalityms.azurewebsites.net';
    }

    //Driver Endpoints
    async getAllDrivers(){
        const response = await axios.get(this.baseURL + '/driver');
        return response.data;
    }

    async getDriverById(id){
        const response = await axios.get(this.baseURL + '/driver/' + id);
        return response.data;
    }

    async createDriver(driver){
        const response = await axios.post(this.baseURL + '/driver', driver);
        return response.data;
    }

    async deleteDriver(id){
        const response = await axios.delete(this.baseURL + '/driver/' + id);
        return response.data;
    }

    //UserC Endpoints
    async getAllUsers(){
        const response = await axios.get(this.baseURL + '/user');
        return response.data;
    }

    async getUserById(id){
        const response = await axios.get(this.baseURL + '/user/' + id);
        return response.data;
    }

    async deleteUser(id){
        const response = await axios.delete(this.baseURL + '/user/' + id);
        return response.data;
    }

    async createUser(user){
        const response = await axios.post(this.baseURL + '/user', user);
        return response.data;
    }
        
}

