import { gql }  from 'apollo-server';

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
    state: String
}

input MessageInput {
    session: String
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
    deleteChat(_id : String) : Boolean
}
`;

export const communicationResolvers = {
    Query: {
        getChats: (_source, _args, { dataSources }) => {
            return dataSources.communicationAPI.getAllChats();
        },
        getChat: (_source, { id }, { dataSources }) => {
            return dataSources.communicationAPI.getChatById(id);
        },
        getMessages: (_source, { id }, { dataSources }) => {
            return dataSources.communicationAPI.getAllMessagesById(id);
        }

    },
    Mutation: {
        createChat: (_source, _args, { dataSources }) => {
            return dataSources.communicationAPI.createChat();
        },
        createMessage: (_source, { id, message }, { dataSources }) => {
            return dataSources.communicationAPI.createMessage(id, message);
        },
        deleteChat: (_source, { id }, { dataSources }) => {
            return dataSources.communicationAPI.deleteChat(id);
        }
    }
};
