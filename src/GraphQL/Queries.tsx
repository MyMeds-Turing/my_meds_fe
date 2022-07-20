import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser {
        fetchUser(id: 2) {
            id
            email
            fullName
        } 
        fetchUserRxs(id: 2) {
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


