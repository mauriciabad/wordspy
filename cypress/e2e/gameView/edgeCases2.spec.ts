describe('Game view edge cases 2', () => {
  it('when wordId is 0 works just fine', () => {
    cy.visit('/game?roleId=normal&wordSetId=17&wordId=0')

    // Word
    cy.contains('Smash')

    // Role name
    cy.contains('Normal')
    // Role description
    cy.contains('Eliminate the Spys')
  })
})
