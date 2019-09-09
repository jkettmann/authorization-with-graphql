import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

const assertMessageParticipant = (user, message) => {
  const isReceiver = user.id === message.receiverId;
  const isSender = user.id === message.senderId;
  if (!isReceiver && !isSender) {
    throw new AuthenticationError('You need to be a participant in the message');
  }
}

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function(...args) {
      const context = args[2];
      const user = context.user || {};
      const userRoles = user.roles || [];
      const requiresParticipant = requiredRole === 'MESSAGE_PARTICIPANT';
      const isUnauthorized = !requiresParticipant && !userRoles.includes(requiredRole);

      if (isUnauthorized) {
        throw new AuthenticationError(`You need following role: ${requiredRole}`);
      }

      const data = await originalResolve.apply(this, args);

      if (requiresParticipant) {
        assertMessageParticipant(user, data);
      }

      return data;
    }
  }
}

export default AuthDirective;
