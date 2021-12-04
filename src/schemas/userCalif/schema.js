import { gql }  from 'apollo-server';

export const userCTypeDefs = gql`
type UserCalif{
    _id: String
    fk: String
    calification: Int
    totalOfComments: Int
}

input UserCalifInput{
    fk: String!
}

type Query{
    getUserCalif(_id: String): UserCalif
    getUserCalifs: [UserCalif]
}

type Mutation{
    createUserCalif(input: UserCalifInput): UserCalif
    deleteUserCalif(_id: String): UserCalif
}
`;

export const userCResolvers = {
    Query: {
        getUserCalif:(_source, {_id}, {dataSources}) => {
            return dataSources.servicequalityAPI.getUserById(_id);
        },
        getUserCalifs:(_source, _args, {dataSources}) => {
            return dataSources.servicequalityAPI.getAllUsers();
        }
    },
    Mutation: {
        createUserCalif:(_source, {input}, { dataSources }) => {
            return dataSources.servicequalityAPI.createUser(input);
        },
        deleteUserCalif:(_source, {_id}, { dataSources }) => {
            return dataSources.servicequalityAPI.deleteUser(_id);
        }
    }
};
