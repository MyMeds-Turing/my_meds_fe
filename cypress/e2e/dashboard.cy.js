
import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('Tests for dashboard/homepage', () => {

  beforeEach(() => {
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
      }

    if(hasOperationName(req, 'fetchUserRxs')) {
      req.alias = 'gqlfetchUsersRxsQuery'
      req.reply((res) => {
        res.body.data.fetchUserRxs.medName = 'gummy bears' 
      })
    }
   })
    cy.visit('http://localhost:3000')
  })

  it('Should have Nav bar that greets the user', () => {
    cy.get('h2').contains('Welcome, John L')
    cy.get('.navButton').contains('Add New Med')
  })

  
})
