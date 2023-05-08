import { urlShouldEqual } from '../support/helpers'

describe('Help dialog', () => {
  it('from the home view', () => {
    cy.visit('/')

    // Closed by default
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/')

    // Opens dialog
    cy.contains('Help').click()
    cy.contains('Rules')
    urlShouldEqual('/?showHelpModal=true')

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Help')
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/')

    // ------------------------
    // Scanning a QR code
    cy.visit('/?showHelpModal=true')

    // Opens dialog
    cy.contains('Rules')
    urlShouldEqual('/?showHelpModal=true')

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Rules').should('not.exist')
    cy.contains('Help')
    urlShouldEqual('/')

    // ------------------------
    // When scanning a QR code with other data
    cy.visit('/?gameRound=9808&wordSetId=5&playerNumber=empty')

    // Closed by default
    cy.contains('Rules').should('not.exist')

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

    // ------------------------
    // When scanning a QR code with other data and showHelpModal true
    cy.visit(
      '/?gameRound=9808&wordSetId=5&playerNumber=empty&showHelpModal=true'
    )

    // Opens dialog
    cy.contains('Rules')
    urlShouldEqual(
      '/?gameRound=9808&wordSetId=5&playerNumber=empty&showHelpModal=true'
    )

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/?gameRound=9808&wordSetId=5&playerNumber=empty')
  })

  it('from the game view', () => {
    cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')

    // Closed by default
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=1')

    // Opens dialog
    cy.contains('Help').click()
    cy.contains('Rules')
    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=1&showHelpModal=true')

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Help')
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=1')

    // ------------------------
    // When scanning a QR code with other data and showHelpModal true
    cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1&showHelpModal=true')

    // Opens dialog
    cy.contains('Rules')
    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=1&showHelpModal=true')

    // Closes dialog
    cy.contains('Close').click()
    cy.contains('Help')
    cy.contains('Rules').should('not.exist')
    urlShouldEqual('/game?roleId=chaos&wordSetId=4&wordId=1')
  })
})
