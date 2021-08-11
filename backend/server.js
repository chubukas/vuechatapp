const { GraphQLServer, PubSub } = require("graphql-yoga");
require("dotenv").config();

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolver");
const DBCONNECTION = require("./dbConnect");
const protect = require("./middlewares/protect");

DBCONNECTION();

const pubsub = new PubSub(); // create instance of PubSub for subribtion

const PORT = process.env.PORT; // create port for the server

// create the server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ({ request }) => {
    return { pubsub, reqUser: protect(request) };
  },
});

// create server options
const options = {
  PORT,
  endpoint: "/VuechatApi",
  subscriptions: "/graphqlChat",
  cors: true,
};

// start the server
server.start(options, ({ PORT }) =>
  console.log(`server is runinng on port ${PORT}`)
);
