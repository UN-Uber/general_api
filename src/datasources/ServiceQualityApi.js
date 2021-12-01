import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class ServiceQualityApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://servicequalityms.azurewebsites.net/';
    }

    async getAllDrivers(){
        const response = await axios.get(this.baseURL + '/driver');
        return response.data;
    }

    async getDriverById(id){
        const response = await axios.get(this.baseURL + '/driver/' + id);
        return response.data;
    }

    async createDriver(driver){
        return this.post(
            `driver`,
            driver,
        )
    }

    async updateDriver(id, driver){
        return this.put(
            `driver/${id}`,
            driver,
        )
    }
        
}

