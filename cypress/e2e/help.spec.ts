import { urlShouldEqual } from '../support/helpers'

describe('Home view', () => {
  it('with empty url', () => {
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
  })

  it('from scanned QR', () => {
    cy.visit('/?gameRound=9808&wordSetId=5&playerNumber=empty')

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

  it('from url with open help dialog', () => {
    cy.visit('/?showHelpModal=true')

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

describe('Game view', () => {
  it('normal', () => {
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
  })
})
