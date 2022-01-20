import { gql }  from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server-express';
import { client as Client, getLastUID, checkIfExist, comparePassword, addUser } from '../../utilities/ldap.js';

export const authTypeDefs = gql`

input AuthInput {
    email : String
    telNumber : String
    password : String!
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

type AuthResponse {
    token : String!
    generatedAt : String!
    expiresIn : String!
}

type Response{
    response : String
}

type Query{
    login(authInput : AuthInput!) : AuthResponse!
}

type Mutation{
    createClient(client : ClientInput!) : Response
}
`

export const authResolvers = {
    Query: {
        login: (_source, { authInput }, { dataSources }) => {
            
            async function fetchData(){
                const clientLDAP = Client();
                
                var edlaParam = "";
                if(authInput.email === "" || authInput.email === null){
                    edlaParam = await dataSources.AccountApi.getEmailByNumber(authInput.telNumber);
                    authInput.email = edlaParam;
                    if(edlaParam == null){
                        throw new AuthenticationError("User not found on LDAP");
                    }
                }
                if(!await checkIfExist(clientLDAP, authInput.email)){
                    throw new AuthenticationError("User not found on LDAP");
                }else{
                    if(!await comparePassword(authInput.email, authInput.password,clientLDAP)){
                        throw new AuthenticationError("Incorrect Password");
                    }else{
                        clientLDAP.unbind();
                        clientLDAP.destroy();
                        let loginData = await dataSources.AccountApi.enterClient(authInput);
                        if(loginData.response){
                            throw new AuthenticationError(loginData.response);
                        }
                        const payload = {
                            user: loginData.email,
                            id: loginData.idClient
                        }
                        let resp = await dataSources.IdentityApi.generateToken(payload);

                        return resp.data;
                    }
                }
                
            }

            return fetchData();
        },
    },
    Mutation:{
        createClient:(_source, {client}, {dataSources}) => {
            async function addClient(){
                let clientCre = await dataSources.AccountApi.createClient(client);
                if(clientCre.response === "Email or phone number already register"){
                    return clientCre;
                }else{
                    var idClient = clientCre.response;
                    let qualityRes = await dataSources.ServiceQuality.createUser({fk:parseInt(idClient)});
                    console.log(idClient);
                    if(qualityRes.status === 201){
                        const clientLDAP = Client();
                        const lastUid = await getLastUID(clientLDAP);
                        await addUser(clientLDAP, client.email, client.password, lastUid+1);
                        return clientCre;
                    }else{
                        return {response: null};
                    }
                }


            }
            return addClient();
        },
    },
}
