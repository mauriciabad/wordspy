import { getInputByLabel } from '../support/helpers'

describe('Home view', () => {
  it('changing languages', () => {
    cy.visit('/')

    // Text is in english by default
    cy.contains("Let's play!")

    getInputByLabel('English').select('Español')

    // Text is in spanish
    cy.contains('¡A jugar!')

    getInputByLabel('Español').select('English')
  })
})

describe('Game view', () => {
  describe('without scanning a qr code', () => {
    beforeEach(() => {
      cy.visit('/game')
    })

    it('shows locale selector', () => {
      getInputByLabel('English')
    })
  })

  describe('scanning a qr code', () => {
    beforeEach(() => {
      cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')
    })

    it('changing languages', () => {
      // Text is in english by default
      cy.contains('Legend')
      cy.contains('Chaos')
      cy.contains('Get eliminated')

      getInputByLabel('English').select('Español')

      // Text is in spanish
      cy.contains('Leyenda')
      cy.contains('Caos')
      cy.contains('Se eliminado')

      getInputByLabel('Español').select('English')
    })
  })
})
