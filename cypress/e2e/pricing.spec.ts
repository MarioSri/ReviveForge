/// <reference types="cypress" />

describe('Pricing', () => {
  it('redirects to success after trial', () => {
    cy.visit('/pricing');
    cy.intercept('POST', '/api/stripe/create-checkout-session', {
      statusCode: 200,
      body: { checkoutUrl: '/pricing/success' },
    }).as('checkout');
    cy.contains('Start 14-day trial').click();
    cy.wait('@checkout');
    cy.url().should('include', '/pricing/success');
    cy.contains('Thanks, you’re Pro now');
  });

  it('shows cancel page', () => {
    cy.visit('/pricing/cancel');
    cy.contains('Checkout cancelled');
    cy.contains('Back to Pricing').click();
    cy.url().should('include', '/pricing');
  });
});
