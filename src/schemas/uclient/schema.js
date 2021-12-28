import { gql }  from 'apollo-server-express';
import { __Type } from 'graphql';

export const clientTypeDefs = gql`
type Client {
    idClient : Int
    fName : String
    sName : String
    sureName : String
    active : Int
    email : String
    telNumber : String
    password : String
    image: String
}

type CreditCard{
    idCard:Int
    idClient:Int
    cardNumber: String
    dueDate: String
    cvv: Int
}

type Response{
    response : String
}

input ClientData {
    email : String!
    telNumber : String!
    password : String!
}

input ClientInput {
    fName : String!
    sName : String
    sureName : String!
    active : Int!
    email : String!
    telNumber : String!
    password : String!
    image: String!
}

union ResponseClient = Client | Response

type Query {
    getClients : [Client]
    getClient(idClient : Int) : Client
    getCardsClient(idClient:Int): [CreditCard]
}

type Mutation {
    deleteClient(idClient : Int!) : String
    updateClient(idClient: Int!, client:ClientInput!):String
}
`;


export const clientResolvers = {
    ResponseClient:{
        __resolveType(obj, context, info){
            if(obj.fName){
                return 'Client';
            }
            if(obj.response){
                return 'Response';
            }
            return null;
        },
    },
    Query: {
        getClients: (_source, _args, { dataSources }) => {
            return dataSources.AccountApi.getAllClients();
        },
        getClient: (_source, { idClient }, { dataSources }) => {
            return dataSources.AccountApi.getClientById(idClient);
        },
        getCardsClient:(_source, { idClient }, { dataSources }) => {
            return dataSources.AccountApi.getCardsByClient(idClient);
        },

    },
    Mutation: {
        deleteClient: (_source, {idClient}, { dataSources }) => {
            return dataSources.AccountApi.deleteClientById(idClient);
        },
        updateClient: (_source, {idClient, client}, { dataSources }) => {
            return dataSources.AccountApi.updateClientById(idClient, client);
        },
    }
};
