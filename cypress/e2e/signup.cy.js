///<reference types="cypress"/>

describe('template spec', () => {
  beforeEach(() =>{
    cy.visit('/register.html')
  })
  describe('Testing signup page', () => {
    it('should check if the form components exist', () => {
      cy.get('form').should('exist')
      cy.get('[data-cy="nameInput"]').should('exist') 
      cy.get('[data-cy="emailInput"]').should('exist')
      cy.get('[data-cy="passwordInput"]').should('exist')
      cy.get('[data-cy="submitBtn"]').should('exist')
    })
    it('should check if it directs to login page', () => {
      cy.get('[data-cy="loginLink"]').click()
    })
    it('should check if the form is working', () => {
      cy.get('[data-cy="nameInput"]').type('Jane Doe')
      cy.get('[data-cy="emailInput"]').type('jane@gmail.com')
      cy.get('[data-cy="passwordInput"]').type('password')
      cy.get('[data-cy="submitBtn"]').click()
      cy.get('[data-cy="message"]').should('exist')
    })
    it('should check is the user exists', () => {
      cy.get('[data-cy="nameInput"]').type('Jane Doe')
      cy.get('[data-cy="emailInput"]').type('jane@gmail.com')
      cy.get('[data-cy="passwordInput"]').type('password')
      cy.get('[data-cy="submitBtn"]').click()
      cy.get('[data-cy="message"]').should('exist')
    })
    it('should check if form fields are empty',() =>{
      cy.get('[data-cy="submitBtn"]').click()
      cy.get('[data-cy="message"]').should('exist')
    })
  })
})