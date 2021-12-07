import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class TaxingApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://taxingms.azurewebsites.net';
    }

    //Taxing Endpoint
    async getPrice(startLatitude, startLongitude, endLatitude, endLongitude ){
        const response = await axios.get(this.baseURL + '/getPrice?startLatitude=' + startLatitude + '&startLongitude=' + startLongitude + '&endLatitude=' + endLatitude + '&endLongitude=' + endLongitude);
        return response.data;
    }
}