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

input ClientData {
    email : String!
    telNumber : String!
    password : String!
}

union ResponseClient = Client | Response

type Query {
    getClients : [Client]
    getClient(idClient : Int) : Client
    getCardsClient(idClient:Int): [CreditCard]
}

type Mutation {
    createClient(client : ClientInput!) : Response
    deleteClient(idClient : Int!) : String
    updateClient(idClient: Int!, client:ClientInput!):String
    enterClient(clientData : ClientData!) : ResponseClient
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
        createClient: (_source, {client}, { dataSources }) => {
            return dataSources.AccountApi.createClient(client);
        },
        deleteClient: (_source, {idClient}, { dataSources }) => {
            return dataSources.AccountApi.deleteClientById(idClient);
        },
        updateClient: (_source, {idClient, client}, { dataSources }) => {
            return dataSources.AccountApi.updateClientById(idClient, client);
        },
        enterClient: (_source, {clientData}, {dataSources}) => {
            return dataSources.AccountApi.enterClient(clientData);
        }
    }
};
