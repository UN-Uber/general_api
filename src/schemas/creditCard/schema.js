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

type Response {
    response : String
}

# Types para el la entidad CreditCard del microservicio Payment
type CreditCardPay {
    id: Int
    creditCardFk: Int
    balance: Int,
    intermediary: String
}

input CreditCardPayInput {
    creditCardFk: Int!
    intermediary: String!
}


type Query {
    getCards : [CreditCard]
    getCard(idCard : Int) : CreditCard

    # Queries para la endidad CreditCard del microservicio Payment
    getCreditCards: [CreditCardPay]
    getCreditCard(creditCardId: Int): [CreditCardPay]
}

type Mutation {
    createCard(card : CreditCardInput!) : Response
    deleteCard(idCard : Int!) : String
    updateCard(idCard: Int!, card:CreditCardInput!):String

    # Mutations para la entidad CreditCard del microservicio
    createCreditCard(creditCardInfo: CreditCardPayInput!): CreditCardPay
    updateCreditCard(creditCardId: Int!, creditCardInfo: CreditCardPayInput!): CreditCardPay

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

        // Queries para la endidad CreditCard del microservicio Payment
        getCreditCards: (_source, _args, { dataSources }) => {
            return dataSources.PaymentApi.getAllCreditCards();
        },
        getCreditCard: (_source, { creditCardId }, { dataSources }) => {
            return dataSources.PaymentApi.getCreditCardById(creditCardId);
        }
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

        // Mutations para la entidad CreditCard del microservicio
        createCreditCard: (_source, { creditCardInfo }, { dataSources }) => {
            return dataSources.PaymentApi.createCreditCard(creditCardInfo);
        },
        updateCreditCard: (_source, { creditCardId, creditCardInfo }, { dataSources }) => {
            return dataSources.PaymentApi.updateCreditCard(creditCardId, creditCardInfo);
        }
    }
};
