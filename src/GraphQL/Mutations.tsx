import { gql } from "@apollo/client";
import { MutationRx } from '../interfaces'

const ADD_RX = gql`
    mutation addRx($userInput: RxInput!){ 
        addRx(input: {
            params: $userInput
        }){
            rx {
                id
            }
        }
    }
`

// const DELETE_RX = gql`
// mutation {
//     deleteRx(input: {id: 8}  ) {
//             id
//           }
//   }`
const DELETE_RX = gql`
    mutation ($ID: DeleteRxInput!){
        deleteRx(input: $ID){
            id
        }
    }
`

export { DELETE_RX, ADD_RX}

// export const ADD_RX = gql`
                        
// mutation whatever($input: UpdateRxInput!) {
//     updateRx(input: $input) {
//         medName
//     }
// }
// `
//things ive learned:

//mutation whatever($input: UpdateRxInput!) {
//          ⬆️ call it whatever you want, doesnt matter. Its like naming a front end function

//$input: UpdateRxInput!
//          ⬆️ this input type is defined by the backend and needs to match. This is defining the type of data that is being passed in, much like Typescript. 
//if you were to try to put in something else, such as ($input: booger!), you get
// Uncaught (in promise) Error: booger isn't a defined input type (on $input)

// updateRx(input: $input) {
//    ⬆️ invoke the function defined by backend, in this case they called it updateRx. Poor naming, this should all be called AddRx, update would be altering the mediine already there as a possible extension
    
// updateRx(input: $input) {
//           ⬆️ argument taken into the function is defined by backend, 
// they called it input. If you were to try to put in something else, 
// such as updateRx(feet: $input), you get:
//Uncaught (in promise) Error: Field 'updateRx' is missing required arguments: input
//Field 'updateRx' doesn't accept argument 'feet'


//The hook in SubmissionForm:

//                                  ⬇️imported from this file
//const [postMed] = useMutation(ADD_RX) 
//          ⬆️ unlike other hooks, this is not a variable, its a function, must be invoked to fire the mutation

//postMed({
//     variables: {
//         input: formData
//     }
// })
//  ⬆️ as an argument to firing that function, you pass in the object that defines the variable values