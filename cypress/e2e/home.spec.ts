import { byTestId } from '../support/helpers'
import { getInputByLabel, urlShouldEqual } from '../support/helpers'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('changing languages', () => {
    // Text is in english by default
    cy.contains('Let\'s play!')

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

    cy.contains('Let\'s play!').click()

    urlShouldEqual('/game?roleId=spy&wordSetId=4&wordId=24')
  })

  it('play with normal', () => {
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8724')
    getInputByLabel('Player number').type('1')

    cy.contains('Let\'s play!').click()

    urlShouldEqual('/game?roleId=normal&wordSetId=4&wordId=24')
  })

  it('word changes with round', () => {
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8725')
    getInputByLabel('Player number').type('1')

    cy.contains('Let\'s play!').click()

    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=25')
  })
})
