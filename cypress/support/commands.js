// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForElementToDisappear', (selector, maxTimeout = 10000) => {
    cy.log(`Checking if ${selector} exists...`);
    
    // Check if the element is present
    cy.get('body').then(($body) => {
      const elementExists = $body.find(selector).length > 0;
      
      if (elementExists) {
        cy.log(`${selector} is present. Waiting for it to disappear...`);
        // If the element is present, use a retry approach for its disappearance
        cy.wrap(null).should(() => {
          expect(Cypress.$(selector).length).to.equal(0);  // Retry until it disappears
        }, { timeout: maxTimeout });
      } else {
        cy.log(`${selector} does not exist. No need to wait.`);
      }
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
});