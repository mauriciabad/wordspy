import { byTestId } from '../../support/helpers'
import { getInputByLabel, urlShouldEqual } from '../../support/helpers'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows QR code', () => {
    cy.get(byTestId('qr'))
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

  it('generate round number', () => {
    getInputByLabel('Round number').type('8725')

    cy.get('[aria-label="Generate"]').click()

    getInputByLabel('Round number').should('not.have.value', '8725')
    getInputByLabel('Round number').should('not.have.value', '')
  })
})
