import { ApolloServer } from 'apollo-server';
import User from './User';
import Message from './Message';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const currentUser = User.getUserByToken(token);
    return { user: currentUser, User, Message }
  },
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
