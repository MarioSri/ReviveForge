describe('ReviveForge E2E Smoke', () => {
  it('Marketplace: filter and view project', () => {
    cy.visit('/marketplace');
    cy.get('[data-testid="filter-techstack"]').select('React');
    cy.get('[data-testid="project-card"]').first().click();
    cy.url().should('include', '/projects/');
  });

  it('Project: submit offer and toast', () => {
    cy.visit('/projects/123'); // Use a real project ID or mock
    cy.get('[data-testid="make-offer-btn"]').click();
    cy.get('[data-testid="offer-amount-input"]').type('1000');
    cy.get('[data-testid="submit-offer-btn"]').click();
    cy.get('[role="alert"]').should('contain', 'Offer submitted');
  });

  it('Favorites: favorite/unfavorite project', () => {
    cy.visit('/projects/123');
    cy.get('[data-testid="favorite-btn"]').click();
    cy.visit('/favorites');
    cy.get('[data-testid="unfavorite-btn"]').first().click();
    cy.get('[role="alert"]').should('contain', 'Favorite updated');
  });

  it('AI Valuation: run and verify metrics', () => {
    cy.visit('/projects/123');
    cy.get('[data-testid="run-valuation-btn"]').click();
    cy.get('[role="alert"]').should('contain', 'AI Valuation complete');
    cy.get('[data-testid="health-score"]').should('not.contain', 'N/A');
  });
});
