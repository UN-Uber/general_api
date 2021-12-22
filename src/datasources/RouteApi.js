import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class RouteApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://routems.azurewebsites.net/";
    }

    // Route Endpoints
    async getAllFavoritePlaces(){
        const response = await axios.get(this.baseURL + '/favplace');
        return response.data;
    }

    async getFavoritePlaceById(idPlace){
        const response = await axios.get(this.baseURL + '/favplace', {params:{id: idPlace}});
        return  response.data;
    }

    async createFavoritePlace(favoritePlace){
        const response = await axios.post(this.baseURL + '/favplace', favoritePlace);
        return response.data;
    }

    async deleteFavoritePlace(idPlace){
        const response = await axios.delete(this.baseURL + '/favplace', {params:{id: idPlace}});
        if (response.status() == 204){
            return true;
        }
        return false;
    }

    async getFavoritePlaceByUserId(idUser){
        const response = await axios.get(this.baseURL+ '/favplace/user', {params:{userId: idUser}});
        return response.data;
    }

    async getAllRecordedRoutes(){
        const response = await axios.get(this.baseURL + '/record');
        return response.data;
    }

    async getRecordRouteById(idRoute){
        const response = await axios.get(this.baseURL + '/record', {params:{id: idRoute}});
        
        return response.data;
    }

    async createRecordRoute(recordRoute){
        const response = await axios.post(this.baseURL + '/record', recordRoute);
        return response.data;
    }

    async deleteRecordRoute(idRoute){
        const response = await axios.delete(this.baseURL + '/record', {params:{id: idRoute}});
        if (response.status() == 204){
            return true;
        }
        return false;
    }

    async getRecordRoutesByUserId(idUser){
        const response = await axios.get(this.baseURL+ '/record/user', {params:{userId: idUser}});
        return response.data;
    }

}
