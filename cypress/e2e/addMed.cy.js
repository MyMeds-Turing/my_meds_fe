import { lstat } from 'fs'
import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('User is able to add a medication to their dashboard', () => {

    beforeEach(() => {
        cy.intercept('GET', 'https://rxnav.nlm.nih.gov/REST/displaynames.json', { fixture: 'meds-fetch.json' });

        cy.intercept('POST', 'https://my-meds-be.herokuapp.com/graphql', (req) => {
            const { body } = req
            aliasQuery(req, 'fetchUser')
            aliasQuery(req, 'fetchUserRxs')
            aliasMutation(req, 'addRX')

            if (hasOperationName(req, 'fetchUser')) {
                req.alias = 'gqlfetchUserQuery'
                req.reply((res) => {
                    res.body.data.fetchUser.fullName = 'Strong Bad'
                })
            }

            if (hasOperationName(req, 'fetchUserRxs')) {
                req.alias = 'gqlfetchUsersRxsQuery'
                req.reply((res) => {
                    res.body.data.fetchUserRxs.medName = 'gummy bears'
                })
            }
        })
        cy.visit('http://localhost:3000')
    })

    it('Should be able to navigate to the add medication form and search', () => {
        cy.get('.navButton').contains('Add New Med').click()
        cy.url().should('eq', 'http://localhost:3000/add-new')
        cy.get('input').type('ibuprofen')
        cy.get('.form__live-search-results-box')
        cy.get('.form__search-result').first().click()
        cy.get('.search-med').contains('ibuprofen')

        cy.get('button').click()
        cy.get('.frequency-num').type('1')
        cy.get('.frequency').select('day')

        cy.get('.dosage-num').type('100')
        cy.get('.unit').select('mg(s)')
        cy.get('.doses-total').type('5000')

        cy.get('[type="checkbox"]').last().check() // Check checkbox element
        cy.get('[type="radio"]').first().check()

        cy.get('.submit').click()
        cy.get('.modal-button').contains('Confirm').click()
    })


})
