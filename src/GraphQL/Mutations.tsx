import { gql } from "@apollo/client";
import { MutationRx } from '../interfaces'

export const UPDATE_RX = gql`

mutation updateRX($input: FormInput!) {
    rx: updateRx(
        input: $input
        )
}
 
    

`
