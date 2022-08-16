import { gql } from "@apollo/client";


export const GET_USER = gql`
    query GetUser($userId: ID!) {
        fetchUser(id: $userId) {
            id
            email
            fullName
        } 
        fetchUserRxs(id: $userId) {
            id
            medName
            dose
            timeOfNextDose
            dosesRemaining
            userInstructions
            additionalInstructions
            icon
            totalDoses
            userId
         }
    }
`


export const GET_ALL_USERS = gql`
query GetAllUsers {
    fetchUsers {
      id
      email
    }
}
`
