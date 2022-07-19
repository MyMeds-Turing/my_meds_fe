
import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('Dashboard', () => {

  // beforeEach(() => {
   //May have issues with GH Actions if we use Before Each?
  // })

  it('Should have Nav bar that greets the user', () => {
    cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => { 

      const { body } = req

      aliasQuery(req, 'fetchUser')
      aliasQuery(req, 'fetchUserRxs')
      aliasMutation(req, 'addRX')

      if(hasOperationName(req, 'fetchUser')) {
        req.alias = 'gqlfetchUserQuery'
        req.reply((res) => {
          res.body.data.fetchUser.fullName = 'Strong Bad'
        })
      } else {
        console.log('Cypress error')
      }
   })
    cy.visit('http://localhost:3000/')
    cy.get('h2').contains('Welcome, John Lennon')
    cy.get('.navButton').contains('Add New Med')
  })

it('Should display the users medications, including name, dosage, next dose', () => {   
  cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => { 

     const { body } = req

     aliasQuery(req, 'fetchUser')
     aliasQuery(req, 'fetchUserRxs')
     aliasMutation(req, 'addRX')

       if(hasOperationName(req, 'fetchUserRxs')) {
       req.alias = 'gqlfetchUsersRxsQuery'
         req.reply((res) => {
        res.body.data.fetchUserRxs.medName = 'gummy bears' 
      })
      } else {
        console.log('Cypress error')
      }
    })

    cy.visit('http://localhost:3000/')
    cy.get('.med-name').first().contains('OxyContin')
    cy.get('p').first().contains('Take 5 mg')
    cy.get('p').contains('Next Dose:')
   

  })


  it('Should display Take Your Meds button for each med that will decrement from total meds when user clicks', () => {
    cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => { 

     const { body } = req

     aliasQuery(req, 'fetchUser')
     aliasQuery(req, 'fetchUserRxs')
     aliasMutation(req, 'addRX')

       if(hasOperationName(req, 'fetchUserRxs')) {
       req.alias = 'gqlfetchUsersRxsQuery'
         req.reply((res) => {
        res.body.data.fetchUserRxs.medName = 'gummy bears' 
      })
      } else {
        console.log('Cypress error')
      }
    })

    cy.visit('http://localhost:3000/')
    cy.get('.med-info-hover').first().trigger('mouseover')
    cy.contains('Remaining Doses: 25')
    cy.get(".take-med-button").first().click()

    //TEST MED DECREMENT HERE
  })

})
