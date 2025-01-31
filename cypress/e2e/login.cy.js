///<reference types="cypress"/>

describe('template spec', () => {
  beforeEach(() =>{
    cy.visit('/index.html')
  })
  describe('Testing login page', () => {
    it('should check if the form components exist', () => {
      cy.get('form').should('exist')
      cy.get('[data-cy="emailInput"]').should('exist')
      cy.get('[data-cy="passwordInput"]').should('exist')
      cy.get('[data-cy="submitBtn"]').should('exist')
    })
    it('should check if it directs to registration page', () => {
      cy.get('[data-cy="registrationLink"]').click()
    })
    it('should check if all fields are inputted', () => {
      cy.get('[data-cy="submitBtn"]').click()
      cy.get('[data-cy="message"]').should('exist')
    })
    it('should check if the form is working', () => {
      cy.get('[data-cy="emailInput"]').type('jane@gmail.com')
      cy.get('[data-cy="passwordInput"]').type('password')
      cy.get('[data-cy="submitBtn"]').click()
      cy.get('[data-cy="message"]').should('exist')
    })
    
  })
})