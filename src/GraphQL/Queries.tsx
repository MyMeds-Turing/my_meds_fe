import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser {
        fetchUser(id: 1) {
            id
            email
            fullName
        } 
         Rxs {
            id
            medName
            dose
            timeOfNextDose
         }
    }
`


