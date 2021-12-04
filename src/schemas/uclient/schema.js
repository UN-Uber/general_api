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

input DriverInput {
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
    createClient(client : ClientInput!) : Client
    deleteClient(idClient : Int!) : Boolean
    updateClient(idClient: Int!, client:ClientInput!):Client
}
`;

export const clientResolvers = {
    Query: {
        getClients: (_source, _args, { dataSources }) => {
            return dataSources.AccountApi.getAllClients();
        },
        getClient: (_source, { id }, { dataSources }) => {
            return dataSources.AccountApi.getClientById(id);
        },
        getCardsClient:(_source, { id }, { dataSources }) => {
            return dataSources.AccountApi.getCardsByClient(id);
        },

    },
    Mutation: {
        createClient: (_source, {client}, { dataSources }) => {
            return dataSources.AccountApi.createClient(client);
        },
        deleteClient: (_source, {id}, { dataSources }) => {
            return dataSources.AccountApi.deleteClientById(id);
        },
        updateClient: (_source, {id, client}, { dataSources }) => {
            return dataSources.AccountApi.updateClientById(id, client);
        },
    }
};
