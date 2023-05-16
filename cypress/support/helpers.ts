export function byTestId<T extends string>(testId: T): `[data-test-id="${T}"]` {
  return `[data-test-id="${testId}"]`
}

export function getInputByLabel<Node extends HTMLElement>(
  label: string,
  cy2: Cypress.Chainable<JQuery<Node>> = cy.root()
) {
  return cy2.within(() => {
    cy2
      .contains(label)
      .invoke('attr', 'for')
      .then((id) => {
        cy2.get(`#${id}`)
      })
  })
}

export function urlShouldEqual(path: string) {
  return cy.url().should('eq', `http://localhost:4173${path}`)
}

export function imageShouldLoad(selector: string) {
  return cy
    .get(selector)
    .should('be.visible')
    .and(($img) => {
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
    })
}
