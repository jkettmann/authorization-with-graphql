import { AuthenticationError } from 'apollo-server';

export const assertAuthenticated = (context) => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in');
  }
};

export const assertAdmin = (context) => {
  assertAuthenticated(context);

  if (!context.user.roles.includes('ADMIN')) {
    throw new AuthenticationError('You need to be a admin');
  }
};

export const assertMessageParticipant = (messageId, context) => {
  assertAuthenticated(context)

  const participantIds = context.Message.getParticipantIds(messageId)
  if (!participantIds.includes(context.user.id)) {
    throw new AuthenticationError('You need to be a participant in the message');
  }
}