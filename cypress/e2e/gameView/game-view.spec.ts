import { urlShouldEqual } from '../../support/helpers'

describe('Game view', () => {
  it('Each role shows right data', () => {
    // Normal
    cy.visit('/game?roleId=normal&wordSetId=4&wordId=1')

    cy.contains('Legend') // Word
    cy.contains('Normal') // Role
    cy.contains('Eliminate the Spys') // Description

    // Spy
    cy.visit('/game?roleId=spy&wordSetId=4&wordId=1')

    cy.contains('???') // Word
    cy.contains('Legend').should('not.exist') // Word
    cy.contains('Spy') // Role
    cy.contains("Don't get eliminated") // Description

    // Chaos
    cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')

    cy.contains('Legend') // Word
    cy.contains('Chaos') // Role
    cy.contains('Get eliminated') // Description

    // wordId is 0
    cy.visit('/game?roleId=normal&wordSetId=17&wordId=0')

    cy.contains('Smash') // Word
    cy.contains('Normal') // Role
    cy.contains('Eliminate the Spys') // Description
  })

  it('Shows errors', () => {
    const showsError = () => {
      // Word
      cy.contains('Legend').should('not.exist')

      // Role
      cy.contains('Normal').should('not.exist')
      cy.contains('Spy').should('not.exist')
      cy.contains('Chaos').should('not.exist')

      // Error
      cy.contains("Make sure you're using the right url")
    }

    // Missing roleId
    cy.visit('/game?wordSetId=4&wordId=1')
    showsError()

    // Missing wordId
    cy.visit('/game?roleId=normal&wordSetId=4')
    showsError()

    // Missing wordSetId
    cy.visit('/game?roleId=normal&wordId=1')
    showsError()

    // Missing everything
    cy.visit('/game')
    showsError()

    // Wrong roleId (wrong)
    cy.visit('/game?roleId=wrong&wordSetId=4&wordId=1')
    showsError()

    // Wrong wordId (999999)
    cy.visit('/game?roleId=normal&wordSetId=4&wordId=999999')
    showsError()

    // Wrong wordSetId (999999)
    cy.visit('/game?roleId=normal&wordSetId=999999&wordId=1')
    showsError()

    // Wrong wordSetId (0)
    cy.visit('/game?roleId=normal&wordSetId=0&wordId=1')
    showsError()
  })

  it('link to new game', () => {
    // Without scanning a QR code
    cy.visit('/game')
    cy.contains('New game').click()
    urlShouldEqual('/')

    // Scanning a qr code
    cy.visit('/game?roleId=normal&wordSetId=4&wordId=1')
    cy.contains('New game').click()
    urlShouldEqual('/')
  })
})
