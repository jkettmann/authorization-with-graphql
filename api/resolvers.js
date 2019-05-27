const resolvers = {
  User: {
    message: (user, args, context) => context.Message.getById(args.id)
  },
  Query: {
    currentUser: (parent, args, context) => context.user
  },
};

export default resolvers;