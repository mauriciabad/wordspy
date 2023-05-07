import { urlShouldEqual } from '../../support/helpers'

describe('Game view new game button', () => {
  it('without scanning a qr code has link to new game', () => {
    cy.visit('/game')

    cy.contains('New game').click()

    urlShouldEqual('/')
  })

  describe('scanning a qr code has link to new game', () => {
    cy.visit('/game?roleId=chaos&wordSetId=4&wordId=1')

    cy.contains('New game').click()

    urlShouldEqual('/')
  })
})
