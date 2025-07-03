describe('CoachMarks', () => {
  beforeEach(() => {
    cy.clearLocalStorage('rf-coach-dismissed');
  });

  it('shows coach-mark for Run AI valuation button on first visit', () => {
    cy.visit('/project/1');
    cy.findByText(/run ai valuation/i).should('exist');
    cy.findByRole('dialog').should('contain', 'AI Valuation');
  });

  it('dismisses coach-mark when button is clicked', () => {
    cy.visit('/project/1');
    cy.findByText(/run ai valuation/i).click();
    cy.findByRole('dialog').should('not.exist');
  });

  it('dismisses coach-mark with ✕ and sets localStorage', () => {
    cy.visit('/project/1');
    cy.findByRole('dialog').within(() => {
      cy.findByLabelText(/dismiss coach mark/i).click();
    });
    cy.window().then(win => {
      expect(win.localStorage.getItem('rf-coach-dismissed')).to.contain('valuation');
    });
  });
});
