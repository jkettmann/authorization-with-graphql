import { rule, shield, chain } from 'graphql-shield';

const isAuthenticated = rule()((parent, args, context) => !!context.user);

const isAdmin = rule()((parent, args, context) => context.user.roles.includes('ADMIN'));

const isMessageParticipant = rule()((parent, args, context) => {
  const participantIds = context.Message.getParticipantIds(args.id)
  return participantIds.includes(context.user.id);
});

const permissions = shield({
  User: {
    roles: chain(isAuthenticated, isAdmin),
    message: chain(isAuthenticated, isMessageParticipant),
  },
  Query: {
    currentUser: isAuthenticated,
  }
});

export default permissions;
