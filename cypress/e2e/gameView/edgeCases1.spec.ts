describe('Game view edge cases 1', () => {
  it('without scanning a qr code explain player what to do', () => {
    cy.visit('/game')

    cy.contains("Make sure you're using the right url")
  })
})
