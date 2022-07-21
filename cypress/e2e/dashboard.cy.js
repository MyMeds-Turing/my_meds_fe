
import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('Dashboard', () => {
  it('Should have Nav bar that greets the user', () => {

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
    cy.visit('http://localhost:3000/my_meds_fe/')
    cy.url().should('eq', 'http://localhost:3000/my_meds_fe/')
    cy.get('h2').contains('Welcome, Steve Holt')
    cy.get('.navButton').contains('Add New Med')
  })

  it('Should display the users medications, including name, dosage, next dose', () => {
    cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      aliasQuery(req, 'GetUser')
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.reply((res) => {
          res.body.data.fetchUserRxs = [
            {
              id: '33',
              userId: 2,
              medName: 'Tylenol',
              timeOfNextDose: "2022-07-29T15:59:35Z",
              totalDoses: 500,
              dosesRemaining: 500,
              dose: '200 mg',
              userInstructions: "Take in the Evening, Take in the Morning, No Heavy Machinery, ",
              additionalInstructions: "Don't forget this!!",
              icon: 'path_to_icon',
              __typename: "Rx"
            },
            {
              id: "18",
              userId: 2,
              medName: "ibuprofen",
              timeOfNextDose: "2022-07-29T04:39:41Z",
              totalDoses: 1,
              dosesRemaining: 0,
              dose: "20 pill(s)",
              userInstructions: "Take in the Evening, Take in the Morning, No Heavy Machinery, ",
              additionalInstructions: "Don't forget this!!",
              icon: "dropper",
              __typename: "Rx"
            }
          ]
        })
      } else {
        console.log('Cypress error')
      }
    })
    cy.visit('http://localhost:3000/my_meds_fe/')
    cy.get('.med-name').first().contains('200 mg of Tylenol')
    cy.get('button').contains('TAKE YOUR MEDS')
    cy.get('p').contains('Next Dose: 7/29/2022 at 10:59:35 AM')
    cy.get('.med-name').last().contains('20 pill(s) of ibuprofen')
    cy.get('button').contains('DELETE')

  })

  it('Should display Take Your Meds button for each med that will decrement from total meds when user clicks', () => {
    // cy.visit('http://localhost:3000/my_meds_fe/')

    cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      aliasQuery(req, 'GetUser')
      if (hasOperationName(req, 'GetUser')) {
        req.alias = 'gqlGetUserQuery'
        req.reply((res) => {
          res.body.data.fetchUserRxs = [
            {
              id: '33',
              userId: 2,
              medName: 'Tylenol',
              timeOfNextDose: "2022-07-29T15:59:35Z",
              totalDoses: 500,
              dosesRemaining: 500,
              dose: '200 mg',
              userInstructions: "Take in the Evening, Take in the Morning, No Heavy Machinery, ",
              additionalInstructions: "Don't forget this!!",
              icon: 'path_to_icon',
              __typename: "Rx"
            },
            {
              id: "18",
              userId: 2,
              medName: "ibuprofen",
              timeOfNextDose: "2022-07-29T04:39:41Z",
              totalDoses: 1,
              dosesRemaining: 0,
              dose: "20 pill(s)",
              userInstructions: "Take in the Evening, Take in the Morning, No Heavy Machinery, ",
              additionalInstructions: "Don't forget this!!",
              icon: "dropper",
              __typename: "Rx"
            }
          ]
        })
      }
    })
    cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      aliasMutation(req, 'takeMed')
      if (hasOperationName(req, 'takeMed')) {
        req.alias = 'gqltakeMedMutation'
        req.reply((res) => {
          res.body.data.id = '33'
          res.body.data.medName = 'Tylenol'
          res.body.data.timeOfLastDose = "2022-07-29T20:35:25Z",
          res.body.data.timeOfNextDose = "2022-07-30T15:59:35Z"
          res.body.data.dosesRemaining = 499
          res.body.data.userId = 2  
        })
      }
    })
    cy.get('.med-info-hover').first().trigger('mouseover')
    cy.get(".take-med-button").first().click({ force: true })
    cy.contains('Remaining Doses: 500')
    cy.get('.med-info-hover').first().trigger('mouseover')
    cy.contains('Remaining Doses: 500')
  })
})
