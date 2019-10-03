import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import User from './User';
import Message from './Message';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import permissions from './permissions'

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  permissions
);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const currentUser = User.getUserByToken(token);
    return { user: currentUser, User, Message }
  },
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
