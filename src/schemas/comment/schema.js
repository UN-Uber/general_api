import { gql }  from 'apollo-server-express';

export const commentTypeDefs = gql`
enum CommentTypeEnum {
    TODRIVER
    TOUSER
}

type Comment {
    _id : String
    calification : Float
    comment : String
    date : String
    driverId : String
    userId : String
    type: CommentTypeEnum
}

input CommentInput {
    calification: Float!
    comment: String!
    driverId: String!
    userId: String!
    type: CommentTypeEnum!
}

input CommentUpdateInput {
    calification: Float
    comment: String
}

type Query {
    getComment(_id: String!): Comment
    getComments: [Comment]
    getCommentsByUserId(userId: String!): [Comment]
    getCommentsByDriverId(driverId: String!): [Comment]
}

type Mutation {
    createComment(comment: CommentInput!): Comment
    updateComment(_id: String!, comment: CommentUpdateInput!): Comment
    deleteComment(_id: String!): Comment
}
`;

export const commentResolvers = {
    Query: {
        getComment: (_source, {_id}, { dataSources }) => {
            return dataSources.servicequalityAPI.getCommentById(_id);
        },
        getComments: (_source, _args, { dataSources }) => {
            return dataSources.servicequalityAPI.getAllComments();
        },
        getCommentsByUserId: (_source, {userId}, { dataSources }) => {
            return dataSources.servicequalityAPI.getCommentsByUser(userId);
        },
        getCommentsByDriverId: (_source, {driverId}, { dataSources }) => {
            return dataSources.servicequalityAPI.getCommentsByDriver(driverId);
        }
    },
    Mutation: {
        createComment: (_source, {comment}, { dataSources }) => {
            return dataSources.servicequalityAPI.createComment(comment);
        },
        updateComment: (_source, {_id, comment}, { dataSources }) => {
            return dataSources.servicequalityAPI.updateComment(_id, comment);
        },
        deleteComment: (_source, {_id}, { dataSources }) => {
            return dataSources.servicequalityAPI.deleteComment(_id);
        }
    }
};
