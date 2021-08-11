import { gql } from "graphql-tag";

export const CHAT_QUERY = gql`
  query ChatsQuery {
    chats {
      id
      from
      message
      createdAt
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessageMutation($from: String!, $message: String!) {
    sendMessage(from: $from, message: $message) {
      id
      from
      message
    }
  }
`;

export const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription MessageSentSubscription {
    messageSent {
      id
      from
      message
      createdAt
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
    $phone: String
  ) {
    createUser(
      inputs: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
        phone: $phone
      }
    )
  }
`;

export const LOGIN_USER = gql`
  mutation siginUser($UsernameOrEmail: String!, $password: String!) {
    signIn(UsernameOrEmail: $UsernameOrEmail, password: $password) {
      token
      user {
        id
        username
        email
        phone
        avatar
      }
    }
  }
`;
