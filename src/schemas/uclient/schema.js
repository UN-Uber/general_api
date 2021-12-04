import { gql }  from 'apollo-server-express';

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

type Query {
    getClients : [Client]
    getClient(idClient : Int) : Client
    getCardsClient(idClient:Int): [CreditCard]
}

type Mutation {
    createClient(client : ClientInput!) : String
    deleteClient(idClient : Int!) : String
    updateClient(idClient: Int!, client:ClientInput!):String
}
`;

export const clientResolvers = {
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
    }
};
