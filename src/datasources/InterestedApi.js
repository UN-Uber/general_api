import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class InterestedApi extends RESTDataSource {
    constructor () {
        super();
        this.baseURL = "https://interested-ms-fxfhurmdwq-uc.a.run.app"
    }

    async closestUber(userloc) {
        const response = await axios.post(this.baseURL + '/closest-partners', userloc);
        return response.data;
    }
}