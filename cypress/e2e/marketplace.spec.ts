/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginByApi', () => {
  // TODO: Set Supabase session cookie for test user
});

describe('Marketplace', () => {
  beforeEach(() => {
    cy.loginByApi();
  });

  it('shows project cards', () => {
    cy.visit('/marketplace?q=');
    cy.get('[data-testid="project-card"]').should('have.length.at.least', 1);
  });

  it('searches projects', () => {
    cy.visit('/marketplace');
    cy.get('input[aria-label="Search projects"]').type('analytics');
    cy.wait(400);
    cy.url().should('include', 'q=analytics');
  });

  it('filters by tech on mobile', () => {
    cy.viewport(375, 667);
    cy.visit('/marketplace');
    cy.get('button[aria-label="Open filters"]').click();
    cy.get('.react-select__control').click();
    cy.get('.react-select__option').contains('React').click();
    cy.contains('Apply').click();
    cy.url().should('include', 'tech=React');
  });

  it('favorites a project', () => {
    cy.visit('/marketplace');
    cy.get('[data-testid="project-card"] button[aria-label*="favorites"]').first().click();
    cy.contains('Added to favorites');
  });

  it('paginates', () => {
    cy.visit('/marketplace');
    cy.contains('Next').click();
    cy.url().should('include', 'page=2');
  });

  it('calls API with correct params', () => {
    cy.intercept('GET', '/api/projects*').as('getProjects');
    cy.visit('/marketplace?q=analytics&tech=React&page=2');
    cy.wait('@getProjects').its('request.url').should('include', 'q=analytics');
    cy.wait('@getProjects').its('request.url').should('include', 'tech=React');
    cy.wait('@getProjects').its('request.url').should('include', 'page=2');
  });
});
