import { RESTDataSource } from "apollo-datasource-rest";
import axios from "axios";

export class PaymentApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://35.188.57.254:8000";
    }

    // Credit Cards Endpoints
    async getAllCreditCards(){
        const response = await axios.get(this.baseURL + '/credit-cards');
        return response.data;
    }

    async getCreditCardById(id){
        const response = await axios.get(this.baseURL + '/credit-cards/' + id);
        return response.data;
    }

    async createCreditCard(creditCard){
        const response = await axios.post(this.baseURL + '/credit-cards', creditCard);
        return response.data;
    }

    async updateCreditCard(id, creditCard){
        const response = await axios.put(this.baseURL + '/credit-cards/' + id, creditCard);
        return response.data;
    }

    // Payments Endpoints

    async getAllPayments(){
        const response = await axios.get(this.baseURL + '/payments');
        return response.data;
    }

    async getUserPayments(id){
        const response = await axios.get(this.baseURL + '/users/' + id + '/payments');
        return response.data;
    }

    async createPayment(payment){
        const response = await axios.post(this.baseURL + '/payments', payment);
        return response.data;
    }
}