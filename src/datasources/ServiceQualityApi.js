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

    async changeStateDriver(id){
        const response = await axios.put(this.baseURL + '/driver/' + id);
        return response.data;
    }

    async getUnoccupiedDriver(){
        const response = await axios.get(this.baseURL + '/driver/Ocuppied');
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

    //Comments Endpoints
    async getAllComments(){
        const response = await axios.get(this.baseURL + '/calification');
        return response.data;
    }

    async getCommentById(id){
        const response = await axios.get(this.baseURL + '/calification/' + id);
        return response.data;
    }

    async createComment(comment){
        const response = await axios.post(this.baseURL + '/calification', comment);
        return response.data;
    }

    async updateComment(id,commentUpdate){
        const response = await axios.put(this.baseURL + '/calification/' + id, commentUpdate);
        return response.data;
    }

    async deleteComment(id){
        const response = await axios.delete(this.baseURL + '/calification/' + id);
        return response.data;
    }

    async getCommentsByDriver(id){
        const response = await axios.get(this.baseURL + '/calification/driver/' + id);
        return response.data;
    }

    async getCommentsByUser(id){
        const response = await axios.get(this.baseURL + '/calification/user/' + id);
        return response.data;
    }
        
}
