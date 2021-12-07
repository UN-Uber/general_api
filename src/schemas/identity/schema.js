import { gql }  from 'apollo-server-express';

export const identityTypeDefs = gql`
#Modelo Identity
type Token {
    token: String
}

input loginInput {
    username: String
    password: String
}

input logoutInput {
    access_token: String
}

type Query {
    logOut(token: logoutInput) : Token
}
type Mutation {
    logIn(user: loginInput) : Token
}

`;

export const identityResolvers = {
    Query: {
        logOut: (_source, { token }, { dataSources }) => {
            let ans = dataSources.IdentityApi.logout(token);
            return ans;
        }
    },
    Mutation: {
         logIn: (_source, { user }, { dataSources }) => {
            let ans = dataSources.IdentityApi.login(user.username ,user.password);
            return ans;
        }
    }
};
