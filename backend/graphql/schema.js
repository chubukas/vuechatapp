const typeDefs = `
    type Chat {
        id: ID!
        from: String!
        message: String!
        createdAt: Date!
    }

    scalar Date

    type User {
        id: ID!
        username: String!
        email: String!
        phone: String
        avatar: String
    }

    input userInput {
        username: String!,
        password: String!,
        confirmPassword: String!,
        phone: String
        email: String!
    }

    type loginResponse {
        token: String!,
        user: User!
    }

    type Query {
        chats : [Chat]!
        users: [User!]!
        user(id: ID!): User!
    }


    type Mutation {
        sendMessage(from: String!, message: String!): Chat!
        createUser(inputs: userInput): String!
        signIn(UsernameOrEmail: String!, password: String!):loginResponse 
    }

    type Subscription {
        messageSent: Chat!
    }
`;

module.exports = typeDefs;
