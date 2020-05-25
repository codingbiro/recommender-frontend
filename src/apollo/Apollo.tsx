import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null,
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: ann(),
  cache,
});

function ann() {
  return authMiddleware.concat(createIsomorphLink());
}

function createIsomorphLink() {
  return new HttpLink({
    uri: "https://prisma.biro.wtf",
  });
}
