import { getInputByLabel } from '../../support/helpers'

describe('Data storage', () => {
  it('reload keeps data', () => {
    cy.visit('/')

    getInputByLabel('Word set').select('Original set 4 - Complex')
    getInputByLabel('Round number').type('8725')
    getInputByLabel('Player number').type('1')

    cy.reload()

    getInputByLabel('Word set').should('have.value', '4')
    getInputByLabel('Round number').should('have.value', '8725')
    getInputByLabel('Player number').should('have.value', '1')
  })

  it('when using QR loads data and stores it', () => {
    cy.visit('/?gameRound=9808&wordSetId=5&playerNumber=empty')

    getInputByLabel('Word set').should('have.value', '5')
    getInputByLabel('Round number').should('have.value', '9808')
    getInputByLabel('Player number').should('have.value', '')

    cy.reload()

    getInputByLabel('Word set').should('have.value', '5')
    getInputByLabel('Round number').should('have.value', '9808')
    getInputByLabel('Player number').should('have.value', '')
  })
})
