import { gql }  from 'apollo-server-express';

export const creditCardTypeDefs = gql`

type CreditCard{
    idCard:Int
    idClient:Int
    cardNumber: String
    dueDate: String
    cvv: Int
}

input CreditCardInput {
    idClient:Int!
    cardNumber: String!
    dueDate: String!
    cvv: Int!
}

type Query {
    getCards : [CreditCard]
    getCard(idCard : Int) : CreditCard
}

type Mutation {
    createCard(card : CreditCardInput!) : CreditCard
    deleteCard(idCard : Int!) : Boolean
    updateCard(idCard: Int!, card:CardInput!):CreditCard
}
`;

export const creditCardResolvers = {
    Query: {
        getCards: (_source, _args, { dataSources }) => {
            return dataSources.AccountApi.getAllCards();
        },
        getCard: (_source, { id }, { dataSources }) => {
            return dataSources.AccountApi.getCardById(id);
        },
    },
    Mutation: {
        createCard: (_source, {card}, { dataSources }) => {
            return dataSources.AccountApi.createCard(card);
        },
        deleteCard: (_source, {id}, { dataSources }) => {
            return dataSources.AccountApi.deletCardById(id);
        },
        updateClient: (_source, {id, card}, { dataSources }) => {
            return dataSources.AccountApi.updateCardById(id, card);
        },
    }
};
