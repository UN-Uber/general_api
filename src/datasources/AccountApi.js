import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class AccountApi extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = 'https://unuberaccount.herokuapp.com/api' 
    }


// Endpoints Account - Clients

    async getAllClients(){
        const response = await axios.get(this.baseURL + '/Client');
        return response.data;
    }

    async getClientById(id){
        const response = await axios.get(this.baseURL + '/Client/' + id);
        return response.data;
    }

    async getCardsByClient(id){
        const response = await axios.get(this.baseURL + '/Client/cards/' + id);
        return response.data;
    }

    async createClient(client){
        const response = await axios.post(this.baseURL + '/Client', client);
        return response.data;
    }

    async updateClientById(id, client){
        const response = await axios.put(this.baseURL + '/Client/' + id, client);
        return response.status;
    }

    async deleteClientById(id){
        const response = await axios.delete(this.baseURL + '/Client/' + id);
        return response.status;
    }

    async enterClient(clientData){
        const response = await axios.post(this.baseURL + '/Client/enter', clientData);
        return response.data;
    }

    async updatePasswordById(id, client){
        const response = await axios.put(this.baseURL + '/Client/changePass/'+id, client);
        return response.data;
    }

    // Endpoints Account - Cards

    async getAllCards(){
        const response = await axios.get(this.baseURL + '/CreditCard');
        return response.data;
    }

    async getCardById(id){
        const response = await axios.get(this.baseURL + '/CreditCard/' + id);
        return response.data;
    }

    async createCard(card){
        const response = await axios.post(this.baseURL + '/CreditCard' , card);
        return response.data;
    }

    async updateCardById(id, card){
        const response = await axios.put(this.baseURL + '/CreditCard/' + id, card);
        return response.status;
    }

    async deletCardById(id){
        const response = await axios.delete(this.baseURL + '/CreditCard/' + id);
        return response.status;
    }
    
}
