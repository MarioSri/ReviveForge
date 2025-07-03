/// <reference types="cypress" />

describe('Dashboard', () => {
  beforeEach(() => {
    cy.loginByApi();
  });

  it('defaults to My Projects tab', () => {
    cy.visit('/dashboard');
    cy.contains('My Projects').should('have.class', 'active');
  });

  it('accepts an offer', () => {
    cy.visit('/dashboard');
    cy.contains('Offers Received').click();
    cy.intercept('PUT', '/api/offers/*', { statusCode: 200 }).as('accept');
    cy.get('button[aria-label="Accept offer"]').first().click();
    cy.wait('@accept');
    cy.contains('Offer accepted');
  });

  it('removes a favorite', () => {
    cy.visit('/dashboard');
    cy.contains('Favorites').click();
    cy.get('button[aria-label="Remove from favorites"]').first().click();
    cy.contains('Removed from favorites');
  });
});
