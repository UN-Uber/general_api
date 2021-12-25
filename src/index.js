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

dotenv.config();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		schema: schema,
		dataSources: () => {
			return {
				servicequalityAPI: new ServiceQualityApi(),
				communicationAPI: new CommunicationApi(),
				taxingApi: new TaxingApi(),
				AccountApi: new AccountApi(),
				PaymentApi: new PaymentApi(),
				IdentityApi: new IdentityApi(),
				interestedAPI: new InterestedApi(),
				routeAPI: new RouteApi(),
			};
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
		`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
	);
}

startApolloServer();
