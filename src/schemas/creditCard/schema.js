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
    createCard(card : CreditCardInput!) : String
    deleteCard(idCard : Int!) : String
    updateCard(idCard: Int!, card:CreditCardInput!):String
}
`;

export const creditCardResolvers = {
    Query: {
        getCards: (_source, _args, { dataSources }) => {
            return dataSources.AccountApi.getAllCards();
        },
        getCard: (_source, { idCard }, { dataSources }) => {
            return dataSources.AccountApi.getCardById(idCard);
        },
    },
    Mutation: {
        createCard: (_source, {card}, { dataSources }) => {
            return dataSources.AccountApi.createCard(card);
        },
        deleteCard: (_source, {idCard}, { dataSources }) => {
            return dataSources.AccountApi.deletCardById(idCard);
        },
        updateClient: (_source, {idCard, card}, { dataSources }) => {
            return dataSources.AccountApi.updateCardById(idCard, card);
        },
    }
};
