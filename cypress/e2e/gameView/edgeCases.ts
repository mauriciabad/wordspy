describe('Game view edge cases', () => {
  it('without scanning a qr code explain player what to do', () => {
    cy.visit('/game')

    cy.contains("Make sure you're using the right url")
  })

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
