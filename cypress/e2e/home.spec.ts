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
    cy.contains('¡A jugar!')

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

  it('help dialog', () => {
    // Closed by default
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/')

    // Opens dialog
    cy.contains('Help').click()
    cy.contains('Rules')
    urlShouldEqual('/?showHelpModal=true')

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/')
  })
})

describe('Home view from scanned QR', () => {
  beforeEach(() => {
    cy.visit('/?gameRound=9808&wordSetId=5&playerNumber=empty')
  })

  it('loads data and stores it', () => {
    getInputByLabel('Word set').should('have.value', '5')
    getInputByLabel('Round number').should('have.value', '9808')
    getInputByLabel('Player number').should('have.value', '')

    cy.reload()

    getInputByLabel('Word set').should('have.value', '5')
    getInputByLabel('Round number').should('have.value', '9808')
    getInputByLabel('Player number').should('have.value', '')
  })

  it('help dialog', () => {
    // Closed by default
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/?gameRound=9808&wordSetId=5&playerNumber=empty')

    // Opens dialog
    cy.contains('Help').click()
    cy.contains('Rules')
    urlShouldEqual(
      '/?gameRound=9808&wordSetId=5&playerNumber=empty&showHelpModal=true'
    )

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/?gameRound=9808&wordSetId=5&playerNumber=empty')
  })
})

describe('Home view from url with open help dialog', () => {
  beforeEach(() => {
    cy.visit('/?showHelpModal=true')
  })

  it('help dialog', () => {
    // Opens dialog
    cy.contains('Rules')
    urlShouldEqual('/?showHelpModal=true')

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Rules').should('not.exist')
    cy.contains('Help')
    urlShouldEqual('/')
  })
})
