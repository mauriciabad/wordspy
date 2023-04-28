import { byTestId } from '../support/helpers'
import { getInputByLabel, urlShouldEqual } from '../support/helpers'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('changing languages', () => {
    // Text is in english by default
    cy.contains('Let\'s play!').should('be.visible')

    getInputByLabel('English').select('Español')

    // Text is in spanish
    cy.contains('¡Empezar a jugar!').should('be.visible')

    getInputByLabel('Español').select('English')
  })

  it('shows QR code', () => {
    cy.get(byTestId('qr')).should('be.visible')
  })
  describe('fills inputs', () => {
    beforeEach(() => {
      getInputByLabel('Word set').select('Original set 4 - Complex')
      getInputByLabel('Round number').type('8724')
      getInputByLabel('Player number').type('2')
    })


    it('clicking play goes to game page', () => {
      cy.contains('Let\'s play!').click()

      urlShouldEqual('/game?roleId=spy&wordSetId=4&wordId=24')
    })
  })
})
