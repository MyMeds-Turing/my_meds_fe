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

const TAKE_RX = gql`
mutation takeMed ($ID: TakeMedInput!){
    takeMed(input: $ID  ) {
            id
            medName
            timeOfLastDose
            timeOfNextDose
            dosesRemaining
            userId
    } 
  }
`

const DELETE_RX = gql`
    mutation deleteRx($ID: DeleteRxInput!){
        deleteRx(input: $ID){
            id
        }
    }
`

export { DELETE_RX, ADD_RX, TAKE_RX}
