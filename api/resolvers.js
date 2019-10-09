import {
  assertAdmin,
  assertMessageParticipant,
  assertAuthenticated,
} from './permissions';

const resolvers = {
  User: {
    message: (user, args, context) => {
      assertMessageParticipant(args.id, context)

      return context.Message.getById(args.id);;
    },
    roles: (user, args, context) => {
      assertAdmin(context);

      return user.roles;
    }
  },
  Query: {
    currentUser: (parent, args, context) => {
      assertAuthenticated(context);

      return context.user;
    }
  },
};

export default resolvers;