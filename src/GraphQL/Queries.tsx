import { gql } from "@apollo/client";

//change the query request to be dynamic based upon userID

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

//Potential next steps: 
/* query the list of all users on load (maybe) so that 
when user inputs credentials can check against fetched data
IF credential match, keep track of user ID and fetch specific 
user data 

*/

// export const GET_ALL_USERS = gql`
// query GetAllUsers {
//     fetchUsers {
//       id
//       firstName
//       lastName
//       fullName
//       email
//       sms
//       notify
//       createdAt
//       updatedAt
//     }
// }
// `
