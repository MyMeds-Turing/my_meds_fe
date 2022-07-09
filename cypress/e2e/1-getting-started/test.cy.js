
describe('Initial cypress test for CI/CD check', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Test runs and displays React page', () => {
    cy.get('p').contains('Edit')
  })

})
