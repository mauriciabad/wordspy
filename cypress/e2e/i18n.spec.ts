import { byAriaLabel, byTestId } from '../support/helpers'

describe('Internationalization', () => {
  it('Changes languages', () => {
    // Home view
    cy.visit('/')

    cy.contains("Let's play!")
    cy.get(byTestId('locale-selector')).select('Español')
    cy.contains('¡A jugar!')
    cy.get(byTestId('locale-selector')).select('English')

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

    cy.get(byTestId('word-set-modal')).within(() => {
      cy.get(byTestId('locale-selector')).select('Español')
    })

    cy.contains('Detalles sobre las colecciones de palabras')
    cy.contains('Simple 1')
    cy.contains('Tarjeta nº 1 del juego de mesa "Remolacha".')
    cy.contains('Español')
    cy.contains('Diario')
    cy.contains('Bestia')
    cy.contains('Risa')

    cy.get(byTestId('word-set-modal')).within(() => {
      cy.get(byTestId('locale-selector')).select('English')
    })
    cy.contains('Close').click()
    // Game view with error
    cy.visit('/game')
    cy.get(byTestId('locale-selector'))

    // Game view
    cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')
    cy.contains('Legend')
    cy.contains('Chaos')
    cy.contains('Get eliminated')

    cy.get(byTestId('locale-selector')).select('Español')

    cy.contains('Leyenda')
    cy.contains('Caos')
    cy.contains('Se eliminado')

    cy.get(byTestId('locale-selector')).select('English')
  })
})
