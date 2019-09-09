import { gql } from 'apollo-server';

const typeDefs = gql`
  directive @auth(
    requires: Role!,
  ) on FIELD_DEFINITION

  enum Role {
    ADMIN
    MESSAGE_PARTICIPANT
    USER
  }

  type Message {
    id: ID
    receiverId: ID
    senderId: ID
    text: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    roles: [Role] @auth(requires: ADMIN)
    message(id: ID!): Message @auth(requires: MESSAGE_PARTICIPANT)
  }

  type Query {
    currentUser: User @auth(requires: USER)
  }
`;

export default typeDefs;