import { createApp } from "vue";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createApolloProvider } from "@vue/apollo-option";
import { setContext } from "@apollo/client/link/context";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.vue";
import router from "@/helpers/router";

const httpLink = new HttpLink({
  uri: "http://localhost:9000/VuechatApi",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:9000/graphqlChat",
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem("token"));
  // return the headers to the context so httpLink can read them

  if (token)
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

createApp(App)
  .use(apolloProvider)
  .use(router)
  .mount("#app");
