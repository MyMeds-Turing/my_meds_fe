
import { verify } from 'crypto'
import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

// aliasQuery(req, 'fetchUserRxs')
// aliasMutation(req, 'addRX')

describe('Dashboard', () => {
  it('Should have Nav bar that greets the user', () => {
    cy.visit('http://localhost:3000/my_meds_fe/')
    cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      aliasQuery(req, 'GetUser')
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.reply((res) => {
          res.body.data.fetchUser.id = 3
          res.body.data.fetchUser.email = 'example@example.com'
          res.body.data.fetchUser.fullName = 'Steve Holt'
        })
      } else {
        console.log('Cypress error')
      }
    })
    cy.url().should('eq', 'http://localhost:3000/my_meds_fe/')
    cy.get('h2').contains('Welcome, Steve Holt')
    cy.get('.navButton').contains('Add New Med')
  })

  it('Should display the users medications, including name, dosage, next dose', () => {
    cy.visit('http://localhost:3000/my_meds_fe/')
    cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      aliasQuery(req, 'GetUser')
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.reply((res) => {
          res.body.data.fetchUserRxs = [
            {
              id: '33',
              medName: 'Tylenol',
              timeOfNextDose: "2022-07-29T15:59:35Z",
              totalDoses: 500,
              dosesRemaining: 500,
              dose: '200 mg',
              additionalInstructions: 'Take with food',
              icon: 'path_to_icon',
              __typename: "Rx"
            },
            {
              additionalInstructions: "Don't forget this!!",
              dose: "20 pill(s)",
              dosesRemaining: 0,
              icon: "dropper",
              id: "18",
              medName: "ibuprofen",
              timeOfNextDose: "2022-07-29T04:39:41Z",
              totalDoses: 1,
              userId: 2,
              userInstructions: "Take in the Evening, Take in the Morning, No Heavy Machinery, ",
              __typename: "Rx"
            }
          ]
        })
      } else {
        console.log('Cypress error')
      }
    })
    cy.get('.med-name').first().contains('200 mg of Tylenol')
    cy.get('button').contains('TAKE YOUR MEDS')
    cy.get('p').contains('Next Dose: 7/29/2022 at 10:59:35 AM')
    cy.get('.med-name').last().contains('20 pill(s) of ibuprofen')
    cy.get('button').contains('DELETE')

  })

  // it.skip('Should display Take Your Meds button for each med that will decrement from total meds when user clicks', () => {
  //   cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => {

  //     const { body } = req

  //     aliasQuery(req, 'fetchUser')
  //     aliasQuery(req, 'fetchUserRxs')
  //     aliasMutation(req, 'addRX')

  //     if (hasOperationName(req, 'fetchUserRxs')) {
  //       req.alias = 'gqlfetchUsersRxsQuery'
  //       req.reply((res) => {
  //         res.body.data.fetchUserRxs.medName = 'gummy bears'
  //       })
  //     } else {
  //       console.log('Cypress error')
  //     }
  //   })

  //   cy.get('.med-info-hover').first().trigger('mouseover')
  //   cy.contains('Remaining Doses: 25')
  //   cy.get(".take-med-button").first().click()

  //   //TEST MED DECREMENT HERE
  // })

})
