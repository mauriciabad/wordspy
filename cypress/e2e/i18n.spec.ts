import { byAriaLabel, byTestId, getInputByLabel } from '../support/helpers'

describe('Internationalization', () => {
  it('Changes languages', () => {
    // Home view
    cy.visit('/')

    cy.contains("Let's play!")
    getInputByLabel('English').select('Español')
    cy.contains('¡A jugar!')
    getInputByLabel('Español').select('English')

    // From word set details dialog
    cy.visit('/')

    cy.get(byAriaLabel('Word set details')).click()

    cy.contains('Word set details')
    cy.contains('Simple 1')
    cy.contains('Set number 1 from the board game "Remolacha".')
    cy.contains('Español')
    cy.contains('Diary')
    cy.contains('Beast')
    cy.contains('Laughter')

    getInputByLabel('English', byTestId('word-set-modal')).select('Español')

    cy.contains('Detalles sobre las colecciones de palabras')
    cy.contains('Simple 1')
    cy.contains('Tarjeta nº 1 del juego de mesa "Remolacha".')
    cy.contains('Español')
    cy.contains('Diario')
    cy.contains('Bestia')
    cy.contains('Risa')

    getInputByLabel('Español', byTestId('word-set-modal')).select('English')
    cy.contains('Close').click()

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
