/// <reference types="cypress" />

describe('Onboarding Checklist', () => {
  beforeEach(() => {
    cy.signupTestUser(); // custom command to create a new user
  });

  it('shows checklist with 0/4 done', () => {
    cy.visit('/dashboard');
    cy.contains('Getting Started');
    cy.contains('Complete your profile');
    cy.contains('Browse a project');
    cy.contains('Run AI valuation');
    cy.contains('Make or accept an offer');
  });

  it('completes profile step', () => {
    cy.visit('/profile');
    cy.completeProfile(); // custom command to fill and submit profile
    cy.visit('/dashboard');
    cy.get('svg.text-green-500').should('have.length', 1);
  });

  it('completes browse step', () => {
    cy.visit('/marketplace');
    cy.visit('/dashboard');
    cy.get('svg.text-green-500').should('have.length', 2);
  });

  it('completes valuation step', () => {
    cy.intercept('POST', '/api/ai/valuate', { statusCode: 200, body: {} });
    cy.visit('/marketplace');
    cy.get('[aria-label="Run AI valuation"]').click();
    cy.visit('/dashboard');
    cy.get('svg.text-green-500').should('have.length', 3);
  });

  it('completes offer step and auto-hides', () => {
    cy.intercept('POST', '/api/offers', { statusCode: 200, body: {} });
    cy.visit('/marketplace');
    cy.get('[aria-label="Make offer"]').click();
    cy.visit('/dashboard');
    cy.get('svg.text-green-500').should('have.length', 4);
    cy.get('Getting Started').should('not.exist');
  });
});
