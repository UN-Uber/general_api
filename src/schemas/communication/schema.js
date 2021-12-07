import { gql }  from 'apollo-server-express';

export const communicationTypeDefs = gql`
#Modelo communication
type Chat {
    _id : String
    driver_id: String
    created_at: String
    state: String
    messages: [String]
}

type Message {
    _id: String
    session: String
    sender_type: String
    message: String
    send_at: String
}

input ChatInput {
    driver_id: String
    user_id: String
    state: String
}

input MessageInput {
    sender_type: String
    message: String
}

type Query {
    getChats : [Chat]
    getChat(_id : String) : Chat
    getMessages(_id : String) : Message
}

type Mutation {
    createChat(chat : ChatInput) : Chat
    createMessage(_id: String, message : MessageInput) : Message
    deleteChat(_id : String) : String
}
`;

export const communicationResolvers = {
    Query: {
        getChats: (_source, _args, { dataSources }) => {
            return dataSources.communicationAPI.getAllChats();
        },
        getChat: (_source, { _id }, { dataSources }) => {
            return dataSources.communicationAPI.getChatById(_id);
        },
        getMessages: (_source, { _id }, { dataSources }) => {
            return dataSources.communicationAPI.getAllMessagesById(_id);
        }

    },
    Mutation: {
        createChat: (_source, { chat }, { dataSources }) => {
            return dataSources.communicationAPI.createChat(chat);
        },
        createMessage: (_source, { _id, message }, { dataSources }) => {
            return dataSources.communicationAPI.createMessage(_id, message);
        },
        deleteChat: (_source, { _id }, { dataSources }) => {
            return dataSources.communicationAPI.deleteChat(_id);
        }
    }
};
