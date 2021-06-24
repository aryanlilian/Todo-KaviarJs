import { gql } from "@apollo/client";

export const SUBSCRIPTION_TEST = gql`
  subscription users($body: EJSON) {
    users(body: $body) {
      event
      document
    }
  }
`;
