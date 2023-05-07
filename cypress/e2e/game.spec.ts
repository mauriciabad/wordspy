import { urlShouldEqual } from '../support/helpers'

describe('Game view', () => {
  describe('without scanning a qr code', () => {
    beforeEach(() => {
      cy.visit('/game')
    })

    it('explain player what to do', () => {
      cy.contains("Make sure you're using the right url")
    })

    it('New game', () => {
      cy.contains('New game').click()

      urlShouldEqual('/')
    })
  })

  describe('scanning a qr code', () => {
    describe('any valid url', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')
      })

      it('New game', () => {
        cy.contains('New game').click()

        urlShouldEqual('/')
      })
    })

    describe('when wordId is 0', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=normal&wordSetId=17&wordId=0')
      })

      it('displays information', () => {
        // Word
        cy.contains('Smash')

        // Role name
        cy.contains('Normal')
        // Role description
        cy.contains('Eliminate the Spys')
      })
    })

    describe('when role is normal', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=normal&wordSetId=4&wordId=1')
      })

      it('displays information', () => {
        // Word
        cy.contains('Legend')

        // Role name
        cy.contains('Normal')
        // Role description
        cy.contains('Eliminate the Spys')
      })
    })
    describe('when role is spy', () => {
      beforeEach(() => {
        cy.visit('/game?roleId=spy&wordSetId=4&wordId=1')
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
        cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')
      })

      it('displays information', () => {
        // Word
        cy.contains('Legend')

        // Role name
        cy.contains('Chaos')
        // Role description
        cy.contains('Get eliminated')
      })
    })
  })
})
