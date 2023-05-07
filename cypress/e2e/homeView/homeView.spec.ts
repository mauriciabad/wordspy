import { byTestId } from '../../support/helpers'
import { getInputByLabel } from '../../support/helpers'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows QR code', () => {
    cy.get(byTestId('qr'))
  })

  it('generate round number', () => {
    getInputByLabel('Round number').type('8725')

    cy.get('[aria-label="Generate"]').click()

    getInputByLabel('Round number').should('not.have.value', '8725')
    getInputByLabel('Round number').should('not.have.value', '')
  })
})
