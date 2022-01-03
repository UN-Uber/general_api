import  _ from 'lodash';
import {driverTypeDefs, driverResolvers} from './driver/schema.js'
import { communicationResolvers, communicationTypeDefs } from './communication/schema.js';
import {userCTypeDefs , userCResolvers} from './userCalif/schema.js';
import {commentTypeDefs, commentResolvers} from './comment/schema.js';
import { taxingResolvers, taxingTypeDefs } from './taxing/schema.js'; 
import { creditCardResolvers, creditCardTypeDefs } from './creditCard/schema.js';
import { clientResolvers, clientTypeDefs } from './uclient/schema.js'; 
import { paymentResolvers, paymentTypeDefs } from './payments/schema.js';
import { interestedResolvers, interestedTypeDefs } from './interested/schema.js';
import {uploadTypeDefs, uploadResolvers} from './upload/schema.js';
import { recordResolvers, recordTypeDefs } from './record/schema.js';
import { favPlaceResolvers, favPlaceTypeDefs } from './favPlace/schema.js';
import {makeExecutableSchema} from '@graphql-tools/schema';

const mergedTypeDefs = [
	driverTypeDefs,
	communicationTypeDefs,
	userCTypeDefs,
	commentTypeDefs,
	uploadTypeDefs,
	creditCardTypeDefs,
	clientTypeDefs,
	paymentTypeDefs,
	taxingTypeDefs,
	interestedTypeDefs,
	recordTypeDefs,
	favPlaceTypeDefs,
];

const mergedResolvers = _.merge(
	driverResolvers,
	communicationResolvers,
	userCResolvers,
	commentResolvers,
	uploadResolvers,
	creditCardResolvers,
	clientResolvers,
	paymentResolvers,
	taxingResolvers,
	interestedResolvers,
	recordResolvers,
	favPlaceResolvers
);

export const schema = makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
});




