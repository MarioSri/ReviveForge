describe('Auth flow', () => {
  it('shows inline error for invalid email on signup', () => {
    cy.visit('/signup');
    cy.get('input[aria-label="Email"]').type('not-an-email');
    cy.contains('Send Magic Link').click();
    cy.contains('Enter a valid email address');
  });

  it('shows success toast for valid email signup', () => {
    cy.intercept('POST', '**/auth/v1/otp', { statusCode: 200, body: {} }).as('otp');
    cy.visit('/signup');
    cy.get('input[aria-label="Email"]').type('user@example.com');
    cy.contains('Send Magic Link').click();
    cy.wait('@otp');
    cy.contains('Check your inbox for a magic link');
  });

  it('redirects to Supabase OAuth for GitHub', () => {
    cy.visit('/signup');
    cy.contains('Sign up with GitHub').click();
    cy.url().should('include', 'supabase.co/auth/v1/authorize');
  });
});
