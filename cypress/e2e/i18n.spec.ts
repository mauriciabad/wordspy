import { getInputByLabel } from '../support/helpers'

describe('Internationalization', () => {
  it('Changes languages', () => {
    // Home view
    cy.visit('/')

    cy.contains("Let's play!")
    getInputByLabel('English').select('Español')
    cy.contains('¡A jugar!')
    getInputByLabel('Español').select('English')

    // Game view with error
    cy.visit('/game')
    getInputByLabel('English')

    // Game view
    cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')
    cy.contains('Legend')
    cy.contains('Chaos')
    cy.contains('Get eliminated')

    getInputByLabel('English').select('Español')

    cy.contains('Leyenda')
    cy.contains('Caos')
    cy.contains('Se eliminado')

    getInputByLabel('Español').select('English')
  })
})
