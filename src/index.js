import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { graphqlUploadExpress } from "graphql-upload";
import dotenv from "dotenv";
import { ServiceQualityApi } from "./datasources/ServiceQualityApi.js";
import { CommunicationApi } from "./datasources/CommunicationApi.js";
import { TaxingApi } from "./datasources/TaxingApi.js";
import { AccountApi } from "./datasources/AccountApi.js";
import { PaymentApi } from "./datasources/PaymentApi.js";
import { IdentityApi } from "./datasources/IdentityApi.js";
import { InterestedApi } from "./datasources/InterestedApi.js";
import { RouteApi } from "./datasources/RouteApi.js";
import { schema } from "./schemas/generalSchema.js";
import { AuthenticationError } from "apollo-server-express";
import { authTypeDefs , authResolvers } from "./schemas/auth/schema.js";

dotenv.config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);
	const authApi = new IdentityApi();

	const server = new ApolloServer({
		schema: schema,
		dataSources: () => {
			return {
				servicequalityAPI: new ServiceQualityApi(),
				communicationAPI: new CommunicationApi(),
				taxingApi: new TaxingApi(),
				AccountApi: new AccountApi(),
				PaymentApi: new PaymentApi(),
				interestedAPI: new InterestedApi(),
				routeAPI: new RouteApi(),
			};
		},
		context: ({ req }) => {
			const token = req.headers.authorization || "";
			if (!token) {
				throw new AuthenticationError("Token not provided");
			}
			const response = authApi.verifyToken(token).then((response) => {
                if(response.status == 401){
                    throw new AuthenticationError(response.data.message);
                }
                return response.data.user;
            });
            return response;
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

    const serverAuth = new ApolloServer({
        typeDefs: authTypeDefs,
        resolvers: authResolvers,
        dataSources: () => {
            return {
                IdentityApi: new IdentityApi(),
                AccountApi: new AccountApi(),
				ServiceQuality : new ServiceQualityApi(),
				Communication: new CommunicationApi(),
				Payment: new PaymentApi(),
            };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

	
    await serverAuth.start();

    serverAuth.applyMiddleware({
        app,
        path: "/auth",
    });
    
    await server.start();
	app.use(graphqlUploadExpress());
	server.applyMiddleware({
		app,
		path: "/",
	});

    

	const port = process.env.PORT || 4000;

	await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
	console.log(
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}\n🚀 AuthServer ready at http://localhost:${port}${serverAuth.graphqlPath}`
	);
}

startApolloServer();
