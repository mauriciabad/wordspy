import { getInputByLabel, urlShouldEqual } from '../../support/helpers'

describe('Home view roles', () => {
  beforeEach(() => {
    cy.visit('/')
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
})
