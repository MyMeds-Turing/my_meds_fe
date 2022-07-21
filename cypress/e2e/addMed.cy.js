import { lstat } from 'fs'
import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('User is able to add a medication to their dashboard', () => {

    beforeEach(() => {
        cy.intercept('GET', 'https://rxnav.nlm.nih.gov/REST/displaynames.json', { fixture: 'meds-fetch.json' });

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
        cy.visit('http://localhost:3000')
    })

    it('Should be able to navigate to the add medication form and search', () => {
        cy.get('.navButton').last().contains('Add New Med').click()
        cy.url().should('eq', 'http://localhost:3000/my_meds_fe/add-new')
        cy.get('input').type('ibuprofen')
        cy.get('.form__live-search-results-box')
        cy.get('.form__search-result').first().click()
        cy.get('.search-med').contains('ibuprofen')

        cy.get('button').click()
        cy.get('.frequency-num').type('1')
        cy.get('.form-tag').last().select('hour')

        cy.get('.dosage-num').type('100')
        cy.get('.form-tag').first().select('mg(s)')
        cy.get('.doses-total').type('5000')

        cy.get('[type="checkbox"]').last().check() // Check checkbox element
        cy.get('[type="radio"]').first().check()
        cy.get('.submit').click()
        cy.get('.modal-button').last().click()
        cy.url().should('eq', 'http://localhost:3000/my_meds_fe/')
    })

})
