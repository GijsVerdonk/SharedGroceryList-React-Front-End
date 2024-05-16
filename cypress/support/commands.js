/* eslint-disable */
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

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('.center-button > .MuiButtonBase-root').click();

    cy.origin('https://dev-1qptdla0pgqbqxfn.us.auth0.com',
        { args: [username, password] },
        ([username, password]) => {
                cy.contains('Log in to dev-1qptdla0pgqbqxfn to continue to SharedGroceryList.');

                cy.get('input[name="username"]').type(username);
                cy.get('input[name="password"]').type(password);

                cy.get('button[name="action"]').click();
    });
});