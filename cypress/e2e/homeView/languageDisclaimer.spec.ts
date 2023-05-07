describe('Language disclaimer', () => {
  it('in home view', () => {
    cy.visit('/')

    cy.contains('This set is best played in')
  })
})
