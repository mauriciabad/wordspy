import { byTestId, urlShouldEqual } from '../support/helpers'
import { getInputByLabel } from '../support/helpers'

describe('Home view', () => {
  it('basic ui elements', () => {
    cy.visit('/')

    // Disabled button
    cy.contains("Let's play!").should('be.disabled')
    cy.contains("Let's play!").click()
    urlShouldEqual('/')

    // Language disclaimer
    cy.contains('This set is best played in')
    getInputByLabel('English').select('Español')
    cy.contains('This set is best played in').should('not.be.visible')

    // QR code
    cy.get(byTestId('qr'))
    cy.contains('scan the QR')

    // Generate round number
    getInputByLabel('Round number').type('8725')
    cy.get('[aria-label="Generate"]').click()
    getInputByLabel('Round number').should('not.have.value', '8725')
    getInputByLabel('Round number').should('not.have.value', '')
  })

  it('data is loaded from url and stored in localstorage', () => {
    // Fields are empty
    cy.visit('/')
    getInputByLabel('Round number').should('have.value', '')
    getInputByLabel('Word set').should('have.value', '1')
    getInputByLabel('Player number').should('have.value', '')

    // Fill fields
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8725')
    getInputByLabel('Player number').type('1')

    cy.reload()

    // Values keeped
    getInputByLabel('Word set').should('have.value', '4')
    getInputByLabel('Round number').should('have.value', '8725')
    getInputByLabel('Player number').should('have.value', '1')

    // Scanning a url fills fields
    cy.visit('/?gameRound=9808&wordSetId=5&playerNumber=1')

    getInputByLabel('Word set').should('have.value', '5')
    getInputByLabel('Round number').should('have.value', '9808')
    getInputByLabel('Player number').should('have.value', '1')

    cy.reload()

    // New values keeped
    getInputByLabel('Word set').should('have.value', '5')
    getInputByLabel('Round number').should('have.value', '9808')
    getInputByLabel('Player number').should('have.value', '')

    // Scanning a url with empty playerNumber
    cy.visit('/?gameRound=2931&wordSetId=3&playerNumber=empty')

    getInputByLabel('Word set').should('have.value', '3')
    getInputByLabel('Round number').should('have.value', '2931')
    getInputByLabel('Player number').should('have.value', '')

    // Scanning a url with no gameRound
    cy.visit('/?wordSetId=6&playerNumber=1')

    getInputByLabel('Word set').should('have.value', '6')
    getInputByLabel('Round number').should('have.value', '2931') // Keeps old  value
    getInputByLabel('Player number').should('have.value', '1')
  })

  it('roles', () => {
    cy.visit('/')

    // Spy
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8724')
    getInputByLabel('Player number').type('2')

    cy.contains("Let's play!").click()

    urlShouldEqual('/game?roleId=spy&wordSetId=4&wordId=24')

    cy.contains('New game').click()

    // Normal
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8724')
    getInputByLabel('Player number').type('1')

    cy.contains("Let's play!").click()

    urlShouldEqual('/game?roleId=normal&wordSetId=4&wordId=24')

    cy.contains('New game').click()

    // Chaos
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8725')
    getInputByLabel('Player number').type('1')

    cy.contains("Let's play!").click()

    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=25')

    cy.contains('New game').click()

    // word changes with round
    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('0')
    getInputByLabel('Player number').type('1')

    cy.contains("Let's play!").click()

    urlShouldEqual('/game?roleId=normal&wordSetId=4&wordId=0')
  })
})
