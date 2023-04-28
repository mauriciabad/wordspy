import { getInputByLabel } from '../support/helpers'

describe('Game view', () => {
  describe('without scanning a qr code', () => {
    beforeEach(() => {
      cy.visit('/game')
    })

    it('explain player what to do', () => {
      cy.contains("Make sure you're using the right url")
    })

    it('shows locale selector', () => {
      getInputByLabel('English')
    })
  })

  describe('scanning a qr code', () => {
    describe('any valid url', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=chaos&wordSetId=4&wordId=4')
      })

      it('shows locale selector and formats date', () => {
        getInputByLabel('English')
      })

      it('changing languages', () => {
        // Text is in english by default
        cy.contains('Bacterium')
        cy.contains('Chaos')
        cy.contains('Get eliminated')

        getInputByLabel('English').select('Español')

        // Text is in spanish
        cy.contains('Bacteria')
        cy.contains('Cahos')
        cy.contains('Se eliminado')

        getInputByLabel('Español').select('English')
      })
    })

    describe('when role is normal', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=normal&wordSetId=4&wordId=4')
      })

      it('displays information', () => {
        // Word
        cy.contains('Bacterium')

        // Role name
        cy.contains('Normal')
        // Role description
        cy.contains('Eliminate the Spys')
      })
    })
    describe('when role is spy', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=spy&wordSetId=4&wordId=4')
      })

      it('displays information', () => {
        // Word
        cy.contains('???')

        // Role name
        cy.contains('Spy')
        // Role description
        cy.contains("Don't get eliminated")
      })
    })
    describe('when role is chaos', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=chaos&wordSetId=4&wordId=4')
      })

      it('displays information', () => {
        // Word
        cy.contains('Bacterium')

        // Role name
        cy.contains('Chaos')
        // Role description
        cy.contains('Get eliminated')
      })
    })
  })
})
