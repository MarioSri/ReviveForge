/// <reference types="cypress" />

describe('Project Detail', () => {
  it('loads carousel and metrics', () => {
    cy.visit('/projects/123');
    cy.get('[data-testid="carousel"]').should('exist');
    cy.get('[data-testid="metrics-strip"]').should('exist');
  });

  it('runs AI valuation', () => {
    cy.intercept('POST', '/api/ai/valuate', { statusCode: 200, body: { value: 12345 } }).as('aiVal');
    cy.visit('/projects/123');
    cy.contains('Run AI Valuation').click();
    cy.wait('@aiVal');
    cy.contains('AI valuation complete');
  });

  it('makes an offer', () => {
    cy.intercept('POST', '/api/offers', { statusCode: 200, body: {} }).as('offer');
    cy.visit('/projects/123');
    cy.contains('Make Offer').click();
    cy.get('input[aria-label="Offer Amount"]').type('500');
    cy.contains('Submit Offer').click();
    cy.wait('@offer');
    cy.url().should('include', '/dashboard?tab=sent');
  });

  it('favorites the project', () => {
    cy.visit('/projects/123');
    cy.get('button[aria-label*="favorites"]').click();
    cy.contains('Added to favorites');
  });
});
