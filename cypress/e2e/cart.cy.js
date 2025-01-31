///<reference types="cypress"/>
describe('template spec', () => {
  beforeEach(() =>{
    cy.visit('/user.html')
  })
  it('should check if the cart is empty', () => {
    cy.get('#total').should('have.text', '0');
    cy.get('[data-cy="checkoutBtn"]').click()
    cy.get('[data-cy="message"]').should('exist')
  })
  it('should add a product to the cart', () => {
    cy.get('[data-cy="addToCartBtn"]').first().click()
    cy.get('[data-cy="checkoutBtn"]').click()
    cy.get('[data-cy="message"]').should('exist')
  })
})