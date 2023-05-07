describe('Game view roles', () => {
  describe('when role is normal', () => {
    cy.visit('/game?roleId=normal&wordSetId=4&wordId=1')

    // Word
    cy.contains('Legend')

    // Role name
    cy.contains('Normal')
    // Role description
    cy.contains('Eliminate the Spys')
  })

  it('when role is spy', () => {
    cy.visit('/game?roleId=spy&wordSetId=4&wordId=1')

    // Word
    cy.contains('???')

    // Role name
    cy.contains('Spy')
    // Role description
    cy.contains("Don't get eliminated")
  })

  it('when role is chaos', () => {
    cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')

    // Word
    cy.contains('Legend')

    // Role name
    cy.contains('Chaos')
    // Role description
    cy.contains('Get eliminated')
  })

  it('when role is missing', () => {
    cy.visit('/game?&wordSetId=4&wordId=1')

    // Word
    cy.contains('Legend').should('not.exist')

    cy.contains("Make sure you're using the right url")
  })
})
