import { ApolloServer }  from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import  _ from 'lodash';
import { ServiceQualityApi } from './datasources/ServiceQualityApi.js';
import {driverResolvers , driverTypeDefs} from './schemas/driver/schema.js';
import {userCTypeDefs , userCResolvers} from './schemas/userCalif/schema.js';
import {commentTypeDefs, commentResolvers} from './schemas/comment/schema.js';
import { communicationResolvers, communicationTypeDefs } from './schemas/communication/schema.js';
import { CommunicationApi } from './datasources/CommunicationApi.js';
import { AccountApi } from './datasources/AccountApi.js';
import { creditCardResolvers, creditCardTypeDefs } from './schemas/creditCard/schema.js';
import { clientResolvers, clientTypeDefs } from './schemas/uclient/schema.js'; 
import express from 'express';
import http from 'http';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

async function startApolloServer(){
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs: [driverTypeDefs, communicationTypeDefs, userCTypeDefs, commentTypeDefs,creditCardTypeDefs,clientTypeDefs],
        resolvers: _.merge(driverResolvers, communicationResolvers, userCResolvers, commentResolvers, creditCardResolvers,clientResolvers),
        dataSources: () => {
            return {
                servicequalityAPI: new ServiceQualityApi(),
                communicationAPI: new CommunicationApi(),
                AccountApi : new AccountApi()
            };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();
    server.applyMiddleware({
        app,
        path: '/',
    })
    
    const port = process.env.PORT || 4000;

    await new Promise(resolve => httpServer.listen({ port: port}, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer();