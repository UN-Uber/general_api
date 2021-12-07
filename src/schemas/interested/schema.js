import { gql } from "apollo-server-core";

export const interestedTypeDefs = gql`
# Interested model
type Userloc {
    partnerid: Int
    partnerlocation: [Float]
}

input UserInput {
    userid: Int
    userlocation: [Float]
}

type Mutation {
    getUserLoc(loc: [UserInput]): Userloc
}

`;

export const interestedResolvers = {
    Mutation: {
        getUserLoc: (_source, {loc}, {dataSources}) => {
            return dataSources.interestedAPI.closestUber(loc);
        }
    }
};