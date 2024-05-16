/* eslint-disable */

describe('Login flow', () => {
    it('successfully login to an account that DOES exists', () => {
        cy.visit('/');
        cy.get('.center-button > .MuiButtonBase-root').click();

        cy.login('test@account.com', '&jS;;4RaZv~h**5');

        cy.contains('SGL');
    });

    it('successfully login to an account that DOES NOT exists', () => {
        cy.visit('/');
        cy.get('.center-button > .MuiButtonBase-root').click();

        cy.origin('https://dev-1qptdla0pgqbqxfn.us.auth0.com', () => {
            cy.contains('Log in to dev-1qptdla0pgqbqxfn to continue to SharedGroceryList.');
            cy.get('input[name="username"]').type("aaaa@account.com");
            cy.get('input[name="password"]').type("wrongpassword");
            cy.get('button[name="action"]').click();

            cy.contains('Wrong email or password');
        });

    });
});

describe('after login', () => {
        it('successfully login to an account that DOES exists', () => {
            cy.login('test@account.com', '&jS;;4RaZv~h**5');
            cy.contains('Rows per page:');
            //TODO: add more tests.
        });
    });
