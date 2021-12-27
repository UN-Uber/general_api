import { gql }  from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server-express';

export const authTypeDefs = gql`

input AuthInput {
    email : String!
    telNumber : String!
    password : String!
}

type AuthResponse {
    token : String!
    generatedAt : String!
    expiresIn : String!
}

type Query{
    login(authInput : AuthInput!) : AuthResponse!
}


`

export const authResolvers = {
    Query: {
        login: (_source, { authInput }, { dataSources }) => {
            /*const loginData = dataSources.AccountApi.enterClient(authInput).then((response) => {
                if(response.response){
                    throw new AuthenticationError(response.response);
                }
                return response;
            }).then((response) => {
                let resp = dataSources.IdentityApi.generateToken(response.email);
                return resp;
            }).then((response) => {
                return response.data;
            });
            return loginData;*/
            
            async function fetchData(){
                let loginData = await dataSources.AccountApi.enterClient(authInput);
                if(loginData.response){
                    throw new AuthenticationError(loginData.response);
                }
                let resp = await dataSources.IdentityApi.generateToken(loginData.email);
                return resp.data;
            }

            return fetchData();
        },
    },
}
