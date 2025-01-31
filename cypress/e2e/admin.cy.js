///<reference types="cypress"/>

describe('template spec', () => {
  beforeEach(() =>{
    cy.visit('/admin.html')
  })
  it('Add new product', () => {
    cy.get('[data-cy="addProductBtn"]').click()
    cy.get('[data-cy="nameInput"]').type('Imac')
    cy.get('[data-cy="imageInput"]').type('https://images.unsplash.com/photo-1529336953128-a85760f58cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVza3RvcHxlbnwwfHwwfHx8MA%3D%3D')
    cy.get('[data-cy="descriptionInput"]').type('Apple product')
    cy.get('[data-cy="priceInput"]').type('70000')
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="message"]').should('exist')
  })
  it('Checks if the form is empty', () => {
    cy.get('[data-cy="addProductBtn"]').click()
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="message"]').should('exist')
  })
  it('Checks if Product alreafy existed', () => {
    cy.get('[data-cy="addProductBtn"]').click()
    cy.get('[data-cy="nameInput"]').type('Imac')
    cy.get('[data-cy="imageInput"]').type('https://images.unsplash.com/photo-1529336953128-a85760f58cb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVza3RvcHxlbnwwfHwwfHx8MA%3D%3D')
    cy.get('[data-cy="descriptionInput"]').type('Apple product')
    cy.get('[data-cy="priceInput"]').type('70000')
    cy.get('[data-cy="submitBtn"]').click()
    cy.get('[data-cy="message"]').should('exist')
  })
})