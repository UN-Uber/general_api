import { ApolloServer }  from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import  _ from 'lodash';
import { ServiceQualityApi } from './datasources/ServiceQualityApi.js';
import {driverResolvers , driverTypeDefs} from './schemas/driver/schema.js';
import {userCTypeDefs , userCResolvers} from './schemas/userCalif/schema.js';
import {commentTypeDefs, commentResolvers} from './schemas/comment/schema.js';
import { communicationResolvers, communicationTypeDefs } from './schemas/communication/schema.js';
import { CommunicationApi } from './datasources/CommunicationApi.js';
import { taxingResolvers, taxingTypeDefs } from './schemas/taxing/schema.js'; 
import { TaxingApi } from './datasources/TaxingApi.js';
import { AccountApi } from './datasources/AccountApi.js';
import { creditCardResolvers, creditCardTypeDefs } from './schemas/creditCard/schema.js';
import { clientResolvers, clientTypeDefs } from './schemas/uclient/schema.js'; 
import { PaymentApi } from './datasources/PaymentApi.js';
import { paymentResolvers, paymentTypeDefs } from './schemas/payments/schema.js';
import express from 'express';
import http from 'http';
import { graphqlUploadExpress } from 'graphql-upload';
import {uploadTypeDefs, uploadResolvers} from './schemas/upload/schema.js';
import dotenv from 'dotenv';
import { identityResolvers, identityTypeDefs } from './schemas/identity/schema.js';
import { IdentityApi } from './datasources/IdentityApi.js';
import { interestedResolvers, interestedTypeDefs } from './schemas/interested/schema.js';
import {InterestedApi} from './datasources/InterestedApi.js';


dotenv.config();

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

async function startApolloServer(){
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs: [driverTypeDefs, communicationTypeDefs, userCTypeDefs, commentTypeDefs, uploadTypeDefs, creditCardTypeDefs, clientTypeDefs, paymentTypeDefs,taxingTypeDefs,interestedTypeDefs,identityTypeDefs],
        resolvers: _.merge(driverResolvers, communicationResolvers, userCResolvers, commentResolvers, uploadResolvers, creditCardResolvers, clientResolvers, paymentResolvers,taxingResolvers,interestedResolvers,identityResolvers),
        dataSources: () => {
            return {
                servicequalityAPI: new ServiceQualityApi(),
                communicationAPI: new CommunicationApi(),
                taxingApi: new TaxingApi(),
                AccountApi : new AccountApi(),
                PaymentApi: new PaymentApi(),
                IdentityApi : new IdentityApi(),
                interestedAPI: new InterestedApi()

            };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();
    app.use(graphqlUploadExpress());
    server.applyMiddleware({
        app,
        path: '/',
    })

    const port = process.env.PORT || 4000;

    await new Promise(resolve => httpServer.listen({ port: port}, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer();
