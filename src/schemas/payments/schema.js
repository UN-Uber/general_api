import { gql } from "apollo-server-core";

export const paymentTypeDefs = gql`

type Payment{
    paymentId: Int
    userId: Int
    creditCardId: Int
    paymentDate: String
    amount: Int
}

input PaymentInput{
    userId: Int!
    amount: Int!
    creditCardId: Int!
}

type Query{
    getPayments: [Payment]
    getUserPayments(userId: Int): [Payment]
}

type Mutation {
    createPayment(payment: PaymentInput): Payment
}`;


export const paymentResolvers = {
    Query: {
        getPayments: (_source, _args, { dataSources }) => {
            return dataSources.PaymentApi.getAllPayments();
        },
        getUserPayments: (_source, { userId }, { dataSources }) => {
            return dataSources.PaymentApi.getUserPayments(userId);
        }
    },
    Mutation: {
        createPayment: (_source, { payment }, { dataSources }) => {
            return dataSources.PaymentApi.createPayment(payment)
        }
    }
}