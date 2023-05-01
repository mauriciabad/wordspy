import { byTestId } from '../support/helpers'
import { getInputByLabel, urlShouldEqual } from '../support/helpers'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('changing languages', () => {
    // Text is in english by default
    cy.contains("Let's play!")

    getInputByLabel('English').select('Español')

    // Text is in spanish
    cy.contains('¡Empezar a jugar!')

    getInputByLabel('Español').select('English')
  })

  it('shows QR code', () => {
    cy.get(byTestId('qr'))
  })

  it('shows language disclaimer', () => {
    cy.contains('This set is best played in')
  })

  it('play with spy', () => {
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8724')
    getInputByLabel('Player number').type('2')

    cy.contains("Let's play!").click()

    urlShouldEqual('/game?roleId=spy&wordSetId=4&wordId=24')
  })

  it('play with normal', () => {
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8724')
    getInputByLabel('Player number').type('1')

    cy.contains("Let's play!").click()

    urlShouldEqual('/game?roleId=normal&wordSetId=4&wordId=24')
  })

  it('word changes with round and chaos', () => {
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8725')
    getInputByLabel('Player number').type('1')

    cy.contains("Let's play!").click()

    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=25')
  })

  it('reload keeps data', () => {
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8725')
    getInputByLabel('Player number').type('1')

    cy.reload()

    getInputByLabel('Word set').should('have.value', '4')
    getInputByLabel('Round number').should('have.value', '8725')
    getInputByLabel('Player number').should('have.value', '1')
  })

  it('generate round number', () => {
    getInputByLabel('Round number').type('8725')

    cy.get('[aria-label="Generate"]').click()

    getInputByLabel('Round number').should('not.have.value', '8725')
    getInputByLabel('Round number').should('not.have.value', '')
  })
})
