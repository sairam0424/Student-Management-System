import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
    mutation signupUser($userNew: UserInput!) {
        signupUser(userNew: $userNew) {
            firstName
        }
    }
`;
