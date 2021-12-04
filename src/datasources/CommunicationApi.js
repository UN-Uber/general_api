import{ RESTDataSource } from 'apollo-datasource-rest';
import axios from 'axios';

export class CommunicationApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://communication-ms-f6ljpbkkwa-uc.a.run.app';
    }

    // Chats Endpoints
    async getAllChats(){
        const response = await axios.get(this.baseURL + '/chat');
        return response.data;
    }

    async getChatById(id){
        const response = await axios.get(this.baseURL + '/chat/' + id);
        return response.data;
    }

    async getAllMessagesById(id){
        const response = await axios.get(this.baseURL + '/chat/messages/' + id);
        return response.data;
    }

    async createChat(chat){
        const response = await axios.post(this.baseURL + '/chat', chat);
        return response.data;
    }

    async deleteChat(id){
        const response = await axios.delete(this.baseURL + '/chat/' + id);
        return response.data;
    }

    // Messages Endpoints
    async createMessage(id, message){
        const response = await axios.post(this.baseURL + '/message/' + id, message);
        return response.data;
    }
}
